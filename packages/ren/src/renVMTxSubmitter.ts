import {
    crossChainParamsType,
    RenVMCrossChainTransaction,
    RenVMProvider,
    RenVMTransaction,
    RenVMTransactionWithStatus,
    TransactionInput,
} from "@renproject/provider";
import {
    ChainTransactionProgress,
    ChainTransactionStatus,
    eventEmitter,
    EventEmitterTyped,
    generateTransactionHash,
    PromiEvent,
    TxStatus,
    TxSubmitter,
    TypedPackValue,
    utils,
} from "@renproject/utils";

export const RENVM_CHAIN = "RenVM";

class RenVMTxSubmitter<Transaction extends RenVMTransaction>
    implements
        TxSubmitter<
            ChainTransactionProgress & {
                response?: RenVMTransactionWithStatus<Transaction>;
            }
        >
{
    public chain = "RenVM";
    public _hash: string;

    private version = "1";
    private provider: RenVMProvider;
    private selector: string;
    private params: TypedPackValue;

    public get tx(): TransactionInput<TypedPackValue> {
        return {
            hash: this._hash,
            selector: this.selector,
            version: this.version,
            in: this.params,
        };
    }

    private signatureCallback?: (
        response: RenVMTransactionWithStatus<Transaction>,
    ) => void;
    public eventEmitter: EventEmitterTyped<{
        status: [
            ChainTransactionProgress & {
                response?: RenVMTransactionWithStatus<Transaction>;
            },
        ];
    }>;

    public status: ChainTransactionProgress & {
        response?: RenVMTransactionWithStatus<Transaction>;
    };

    private updateStatus = (
        status: Partial<
            ChainTransactionProgress & {
                response?: RenVMTransactionWithStatus<Transaction>;
            }
        >,
    ) => {
        this.status = {
            ...this.status,
            ...status,
        };
        this.eventEmitter.emit("status", this.status);
        return this.status;
    };

    public constructor(
        provider: RenVMProvider,
        selector: string,
        params: TypedPackValue,
        signatureCallback?: (
            response: RenVMTransactionWithStatus<Transaction>,
        ) => void,
    ) {
        this.provider = provider;
        this.selector = selector;
        this.params = params;
        this.eventEmitter = eventEmitter();
        this.signatureCallback = signatureCallback;

        this._hash = utils.toURLBase64(
            generateTransactionHash(this.version, this.selector, this.params),
        );

        this.status = {
            chain: RENVM_CHAIN,
            status: ChainTransactionStatus.Ready,
            target: 1,
            transaction: {
                chain: RENVM_CHAIN,
                txid: this._hash,
                txidFormatted: this._hash,
                txindex: "0",
            },
        };
    }

    public submit(): PromiEvent<
        ChainTransactionProgress & {
            response?: RenVMTransactionWithStatus<Transaction>;
        },
        {
            status: [
                ChainTransactionProgress & {
                    response?: RenVMTransactionWithStatus<Transaction>;
                },
            ];
        }
    > {
        const promiEvent = utils.newPromiEvent<
            ChainTransactionProgress & {
                response?: RenVMTransactionWithStatus<Transaction>;
            },
            {
                status: [
                    ChainTransactionProgress & {
                        response?: RenVMTransactionWithStatus<Transaction>;
                    },
                ];
            }
        >(this.eventEmitter);

        (async (): Promise<
            ChainTransactionProgress & {
                response?: RenVMTransactionWithStatus<Transaction>;
            }
        > => {
            try {
                await this.provider.submitTx(this.tx);
            } catch (error) {
                try {
                    // Check if the darknodes have already seen the transaction
                    await this.provider.queryTx(this._hash);

                    // TODO: Set status based on result.

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (errorInner: any) {
                    // Retry submitting to reduce chance of network issues
                    // causing problems.
                    await this.provider.submitTx(this.tx, 2);
                }
            }

            return this.updateStatus({
                status: ChainTransactionStatus.Confirming,
            });

            // const response = {
            //     version: parseInt(tx.version),
            //     hash: tx.hash,
            //     selector: tx.selector,
            //     in: unmarshalTypedPackValue(tx.in),
            // };
        })()
            .then(promiEvent.resolve)
            .catch(promiEvent.reject);

        return promiEvent;
    }

    public wait(): PromiEvent<
        ChainTransactionProgress & {
            response?: RenVMTransactionWithStatus<Transaction>;
        },
        {
            status: [
                ChainTransactionProgress & {
                    response?: RenVMTransactionWithStatus<Transaction>;
                },
            ];
        }
    > {
        const promiEvent = utils.newPromiEvent<
            ChainTransactionProgress & {
                response?: RenVMTransactionWithStatus<Transaction>;
            },
            {
                status: [
                    ChainTransactionProgress & {
                        response?: RenVMTransactionWithStatus<Transaction>;
                    },
                ];
            }
        >(this.eventEmitter);

        (async (): Promise<
            ChainTransactionProgress & {
                response?: RenVMTransactionWithStatus<Transaction>;
            }
        > => {
            let tx: RenVMTransactionWithStatus<Transaction>;
            let existingStatus: TxStatus | undefined = undefined;
            while (true) {
                try {
                    tx = await this.provider.queryTx(this._hash, 1);
                    if (tx && tx.txStatus === TxStatus.TxStatusDone) {
                        break;
                    }
                    if (
                        tx.txStatus !== existingStatus ||
                        !this.status.response
                    ) {
                        try {
                            existingStatus = tx.txStatus;
                            this.updateStatus({
                                response: tx,
                                status: ChainTransactionStatus.Done,
                            });
                        } catch (error) {
                            // Ignore non-critical error.
                        }
                    }
                } catch (error: unknown) {
                    if (
                        error instanceof Error &&
                        /(not found)|(not available)/.exec(
                            String((error || {}).message),
                        )
                    ) {
                        // ignore
                    } else {
                        console.error(error);
                        // TODO: throw unexpected errors
                    }
                }
                await utils.sleep(15 * utils.sleep.SECONDS);
            }

            const maybeCrossChainTx = tx as any as RenVMCrossChainTransaction;
            if (
                maybeCrossChainTx.out &&
                maybeCrossChainTx.out.revert &&
                maybeCrossChainTx.out.revert.length > 0
            ) {
                const revertMessage = maybeCrossChainTx.out.revert;
                this.updateStatus({
                    status: ChainTransactionStatus.Reverted,
                    revertReason: revertMessage,
                });
                throw new Error(`RenVM transaction reverted: ${revertMessage}`);
            }

            if (this.signatureCallback) {
                try {
                    this.signatureCallback(tx);
                } catch (error) {
                    // TODO: Handle error.
                }
            }

            return this.updateStatus({
                response: tx,
                status: ChainTransactionStatus.Done,
            });
        })()
            .then(promiEvent.resolve)
            .catch(promiEvent.reject);

        return promiEvent;
    }
}

export class RenVMCrossChainTxSubmitter extends RenVMTxSubmitter<RenVMCrossChainTransaction> {
    public constructor(
        provider: RenVMProvider,
        selector: string,
        params: RenVMCrossChainTransaction["in"],
        signatureCallback?: (
            response: RenVMTransactionWithStatus<RenVMCrossChainTransaction>,
        ) => void,
    ) {
        super(
            provider,
            selector,
            {
                t: crossChainParamsType,
                v: {
                    txid: utils.toURLBase64(params.txid),
                    txindex: params.txindex.toFixed(),
                    amount: params.amount.toFixed(),
                    payload: utils.toURLBase64(params.payload),
                    phash: utils.toURLBase64(params.phash),
                    to: params.to,
                    nonce: utils.toURLBase64(params.nonce),
                    nhash: utils.toURLBase64(params.nhash),
                    gpubkey: utils.toURLBase64(params.gpubkey),
                    ghash: utils.toURLBase64(params.ghash),
                },
            },
            signatureCallback,
        );
    }
}
