import { describe, it } from "mocha";

/* eslint-disable no-console */
import { fromBase64, fromHex, RenNetwork } from "@renproject/utils";

import { Bitcoin, BitcoinCash, Dogecoin, Zcash } from "../src";
import { hash160 } from "../src/utils/utils";

describe("Common", () => {
    for (const ChainClass of [Bitcoin, Zcash, BitcoinCash, Dogecoin]) {
        for (const network of [RenNetwork.Mainnet, RenNetwork.Testnet]) {
            it(ChainClass.asset, async () => {
                const chain = new ChainClass();
                chain.initialize(network);
                const gHash = fromBase64(
                    "cQ+CJ8bOP4RMopOCNDvbQ020Eu8KRpYykurZyKNFM1I=",
                );

                const publicKey = fromHex(
                    "030dd65f7db2920bb229912e3f4213dd150e5f972c9b73e9be714d844561ac355c",
                );

                const address = await chain.getGatewayAddress(
                    chain.asset,
                    hash160(publicKey),
                    gHash,
                );

                if (false as boolean) {
                    console.log(`${chain.name} ${network}: ${address}`);
                }
            });
        }
    }
});
