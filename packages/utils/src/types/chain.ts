/* eslint-disable @typescript-eslint/no-explicit-any */

import BigNumber from "bignumber.js";

import { TxSubmitter, TxWaiter } from "../txSubmitter";
import { UrlBase64String } from "./types";

export type SyncOrPromise<T> = Promise<T> | T;

export enum InputType {
    Lock = "lock",
    Burn = "burn",
}

export enum OutputType {
    Mint = "mint",
    Release = "release",
}

// A NumericString should be a valid numeric value, represented by a string to
// avoid precision issues, while still being JSON-encodable.
export type NumericString = string;

export interface ChainTransaction {
    chain: string;
    txid: UrlBase64String;
    txindex: NumericString;

    txidFormatted: string;
}

export interface InputChainTransaction extends ChainTransaction {
    amount: string;
    toRecipient?: string;
    toChain?: string;

    nonce?: string; // urlBase64 encoded
    toPayload?: string; // urlBase64 encoded
}

/**
 * # Adding chains #
 *
 * Once a chain has been added to the
 * [multichain repo](https://github.com/renproject/multichain)
 * and accepted by the darknodes, a handler can be written for RenJS.
 *
 * There are two categories of chains - deposit chains and contract chains, each
 * required to implement a different set of functions. A chain may implement
 * both sets of functions. Deposit chains are lock-chains where funds are locked
 * by sending them to a gateway address, while contract chains are either
 * lock-chains where funds are locked through a function call, or mint-chains
 * capable of hosting assets from other chains.
 *
 * If a chain is a fork of another supported chain, it can extend/inherit from
 * the original chain's class to simplify adding support. This is currently done
 * for Bitcoin-based chains and for EVM-based chains.
 *
 * If a chain has multiple assets (e.g. ETH and ERC20s), it's recommended that
 * a single handler is written that supports all the relevant assets.
 *
 * NOTE: The following interfaces are not final and are subject to change
 * across patch and minor versions.
 */

export interface ChainCommon {
    chain: string;

    // Expose a map of assets supported by the chain. Note that the list may
    // not be complete, and will become out-of-date as new assets are added.
    // Should only be used to improve readability when integrating with RenJS.
    assets: { [asset: string]: string };

    /** Override the chain's provider. */
    withProvider?: (...args: any[]) => SyncOrPromise<this>;

    /** Return the asset's decimals, or throw for an unsupported asset. */
    assetDecimals: (asset: string) => SyncOrPromise<number>;

    /** Return a transactions current number of confirmations. */
    transactionConfidence: (
        transaction: ChainTransaction,
    ) => SyncOrPromise<BigNumber>;

    /** Fetch the address's asset balance. */
    getBalance(asset: string, address: string): SyncOrPromise<BigNumber>;

    /** Check if the address's format is valid. */
    validateAddress(address: string): boolean;

    /** Check if the transaction's format is valid. */
    validateTransaction(transaction: ChainTransaction): boolean;

    /**
     * `formatAddress` should format an address for displaying to users.
     *
     * A RenVM transaction's `to` field is not always in the same format that
     * is displayed to users.
     */
    formatAddress?: (address: string) => string;

    /** Return a URL to the address's page on an explorer. */
    addressExplorerLink: (address: string) => string | undefined;

    formattedTransactionHash(transaction: {
        txid: string;
        txindex: string;
    }): string;

    /** Return a URL to the transaction's page on an explorer. */
    transactionExplorerLink: (
        transaction: ChainTransaction,
    ) => string | undefined;

    // /** Return a TxWaiter instance for the provided chain transaction. */
    // getTxWaiter: (
    //     tx: ChainTransaction,
    //     target?: number,
    // ) => SyncOrPromise<TxWaiter>;
}

export interface DepositChain<
    FromPayload extends { chain: string; txConfig?: any } = {
        chain: string;
    },
    ToPayload extends { chain: string; txConfig?: any } = {
        chain: string;
    },
> extends ChainCommon {
    /** Return true if the asset originates from the chain. */
    isLockAsset: (asset: string) => SyncOrPromise<boolean>;

    /**
     * On contract chains, some lock assets may be deposit assets and others
     * may be locked through a smart contract.
     */
    isDepositAsset: (asset: string) => SyncOrPromise<boolean>;

    /**
     * Generate a gateway address deterministically from a shard's public key
     * and a gateway hash.
     *
     * The shardPublicKey is a compressed secp256k1 public key.
     */
    createGatewayAddress: (
        asset: string,
        fromPayload: FromPayload,
        shardPublicKey: Buffer,
        gHash: Buffer,
    ) => SyncOrPromise<string>;

    /** Watch for deposits made to the provided address. */
    watchForDeposits?: (
        asset: string,
        fromPayload: FromPayload,
        address: string,
        onInput: (input: InputChainTransaction) => void,
        removeInput: (input: InputChainTransaction) => void,
        listenerCancelled: () => boolean,
    ) => Promise<void>;

    /** Return toPayload in standard to/payload format. */
    getOutputPayload: (
        asset: string,
        type: OutputType.Release,
        toPayload: ToPayload,
    ) => SyncOrPromise<{
        to: string;
        toBytes: Buffer;
        payload: Buffer;
    }>;
}

export const isDepositChain = (chain: any): chain is DepositChain =>
    (chain as DepositChain).createGatewayAddress !== undefined;

export interface ContractChain<
    FromContractCall extends { chain: string; txConfig?: any } = any,
    ToContractCall extends { chain: string; txConfig?: any } = FromContractCall,
> extends ChainCommon {
    /** Return true if the asset originates from the chain. */
    isLockAsset: (asset: string) => SyncOrPromise<boolean>;

    /** Return true if the asset can be minted on the chain. */
    isMintAsset: (asset: string) => SyncOrPromise<boolean>;

    // Get contract addresses.
    getRenAsset: (asset: string) => SyncOrPromise<string>;
    getMintGateway: (asset: string) => SyncOrPromise<string>;
    getLockAsset: (asset: string) => SyncOrPromise<string>;
    getLockGateway: (asset: string) => SyncOrPromise<string>;

    // Setup transactions //////////////////////////////////////////////////////

    getInputSetup?: (
        asset: string,
        type: InputType,
        contractCall: FromContractCall,
        params: () => {
            toChain: string;
            toPayload: {
                to: string;
                toBytes: Buffer;
                payload: Buffer;
            };
            gatewayAddress?: string;
        },
    ) => SyncOrPromise<{
        [key: string]: TxSubmitter | TxWaiter;
    }>;

    getOutputSetup?: (
        asset: string,
        type: OutputType,
        contractCall: ToContractCall,
    ) => SyncOrPromise<{
        [key: string]: TxSubmitter | TxWaiter;
    }>;

    // Input and output transactions ///////////////////////////////////////////

    /**
     * Submit a lock or a burn transaction. The return type is an array of
     * `InputChainTransaction` because there may be multiple lock or burn events
     * in the transaction.
     */
    getInputTx: (
        type: InputType,
        asset: string,
        contractCall: FromContractCall,
        params: () => {
            toChain: string;
            toPayload: {
                to: string;
                toBytes: Buffer;
                payload: Buffer;
            };
            gatewayAddress?: string;
        },
        confirmationTarget: number,
        onInput: (input: InputChainTransaction) => void,
        removeInput: (input: InputChainTransaction) => void,
    ) => SyncOrPromise<TxSubmitter | TxWaiter>;

    /**
     * Submit a mint or release transaction. When this is initially called as
     * a pre-check, the sigHash and signature will not be set.
     */
    getOutputTx: (
        type: OutputType,
        asset: string,
        contractCall: ToContractCall,
        params: () => {
            sHash: Buffer;
            pHash: Buffer;
            nHash: Buffer;

            amount?: BigNumber;
            sigHash?: Buffer;
            signature?: Buffer;
        },
        confirmationTarget: number,
    ) => SyncOrPromise<TxSubmitter | TxWaiter>;

    getOutputPayload: (
        asset: string,
        type: OutputType,
        contractCall: ToContractCall,
    ) => SyncOrPromise<{
        to: string;
        toBytes: Buffer;
        payload: Buffer;
    }>;
}

export const isContractChain = (chain: any): chain is ContractChain =>
    (chain as ContractChain).getInputTx !== undefined &&
    // (chain as ContractChain).submitLock !== undefined &&
    (chain as ContractChain).getOutputTx !== undefined;
// && (chain as ContractChain).submitRelease !== undefined

export type Chain<
    FromPayload extends { chain: string; txConfig?: any } = any,
    ToPayload extends { chain: string; txConfig?: any } = FromPayload,
> =
    | DepositChain<FromPayload, ToPayload>
    | ContractChain<FromPayload, ToPayload>;
