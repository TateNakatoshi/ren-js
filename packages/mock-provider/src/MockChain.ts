import BigNumber from "bignumber.js";

import { BitcoinBaseChain } from "@renproject/chains-bitcoin";
import { UTXO } from "@renproject/chains-bitcoin/build/main/APIs/API";

import { randomBytes } from "./utils";

export class MockChain extends BitcoinBaseChain {
    public mempool: Array<UTXO & { to: string }>;

    public assets: {
        default: string;
    };

    public constructor(chain: string, asset: string) {
        super({
            label: chain,
            selector: chain,

            nativeAsset: {
                name: asset,
                symbol: asset,
                decimals: 8,
            },

            isTestnet: true,
            p2shPrefix: Buffer.from([0xc4]),
            explorer: {
                url: "",
                address: (_address: string) => "",
                transaction: (_txid: string) => "",
            },
            providers: [
                {
                    fetchHeight: async () => Promise.resolve("6"),
                    fetchUTXO: async (txid: string, txindex: string) =>
                        this.fetchUTXO(txid, txindex),
                    fetchUTXOs: async (address: string) =>
                        this.fetchUTXOs(address),
                    fetchTXs: async (address: string) =>
                        this.fetchUTXOs(address),
                },
            ],
        });
        this.mempool = [];
        this.chain = chain;
        this.assets = {
            default: asset,
        };
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public fetchUTXO = async (txid: string, txindex: string): Promise<UTXO> => {
        const utxo = this.mempool.find(
            (x) => x.txid === txid && x.txindex === txindex,
        );
        if (utxo) {
            return utxo;
        }
        throw new Error(`UTXO ${txid}, ${txindex} not found`);
    };
    public fetchUTXOs = async (address: string): Promise<UTXO[]> =>
        this.mempool.filter((x) => x.to === address);

    public addUTXO = (to: string, amount: BigNumber | number): UTXO => {
        const tx: UTXO & { to: string } = {
            to,
            txid: randomBytes(32).toString("hex"),
            txindex: "0",
            amount: amount.toString(),
            height: "0",
        };
        this.mempool.push(tx);
        return tx;
    };
}
