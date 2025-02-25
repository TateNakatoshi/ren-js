import createHash from "create-hash";
import { validate } from "wallet-address-validator";
import BTCValidator from "wallet-address-validator/src/bitcoin_validator";

import {
    BitcoinNetworkConfig,
    BitcoinNetworkConfigMap,
    BitcoinNetworkInput,
    isBitcoinNetworkConfig,
} from "./types";

export const validateAddress = (
    address: string,
    asset: string,
    network: string,
) => {
    if (asset === "DGB") {
        const currency = {
            name: "digibyte",
            symbol: "dgb",
            addressTypes: { prod: ["1e", "3f"], testnet: ["7e", "8c"] },
            validator: BTCValidator,
            segwitHrp: network === "prod" ? "dgb" : "dgbt",
        };

        return currency.validator.isValidAddress(address, currency, network);
    }

    return validate(address, asset, network);
};

export const StandardBitcoinExplorer = (
    baseUrl: string,
): BitcoinNetworkConfig["explorer"] => ({
    url: baseUrl,
    address: (address: string) =>
        `${baseUrl.replace(/\/$/, "")}/address/${address}`,
    transaction: (transaction: string) =>
        `${baseUrl.replace(/\/$/, "")}/tx/${transaction || ""}`,
});

export const SoChainExplorer = (chainPath: string, chainId: string) => ({
    url: `https://sochain.com/${chainPath}`,
    address: (address: string) =>
        `https://sochain.com/address/${chainId}/${address}`,
    transaction: (transaction: string) =>
        `https://sochain.com/tx/${chainId}/${transaction}`,
});

export const resolveBitcoinNetworkConfig = (
    configMap: BitcoinNetworkConfigMap,
    renNetwork: BitcoinNetworkInput,
): BitcoinNetworkConfig => {
    let networkConfig: BitcoinNetworkConfig | undefined;
    if (renNetwork && isBitcoinNetworkConfig(renNetwork)) {
        networkConfig = renNetwork;
    } else {
        networkConfig = configMap[renNetwork];
    }

    if (!networkConfig) {
        throw new Error(
            `Unsupported network '${String(
                renNetwork
                    ? typeof renNetwork === "string"
                        ? renNetwork
                        : renNetwork.selector
                    : renNetwork,
            )}'. Valid options are 'mainnet', 'testnet' or a BitcoinNetworkConfig object.`,
        );
    }

    return networkConfig;
};

/** Calculate the sha256 hash of the input. */
export const sha256 = (input: Buffer): Buffer =>
    createHash("sha256").update(input).digest();

/** Calculate the ripemd160 hash of the input. */
export const ripemd160 = (input: Buffer): Buffer =>
    createHash("rmd160").update(input).digest();

/**
 * hash160 is used to calculate the Bitcoin address from a private key, and is
 * equivalent to `ripemd160(sha256(publicKey))`
 */
export const hash160 = (publicKey: Buffer): Buffer =>
    ripemd160(sha256(publicKey));
