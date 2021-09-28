import { RenNetwork } from "@renproject/interfaces";

import { Ethereum, EthereumClassConfig } from "./ethereum";
import { EthProvider, EvmNetworkConfig, EvmNetworkInput } from "./utils/types";
import { StandardExplorer } from "./utils/utils";

export const fantomMainnetConfig: EvmNetworkConfig = {
    name: "Fantom Mainnet",
    networkID: 250,
    rpcUrl: () => `https://rpcapi.fantom.network`,
    explorer: StandardExplorer("https://ftmscan.com"),
    addresses: {
        GatewayRegistry: "0x21C482f153D0317fe85C60bE1F7fa079019fcEbD",
        BasicAdapter: "0xAC23817f7E9Ec7EB6B7889BDd2b50e04a44470c5",
    },
};

export const fantomTestnetConfig: EvmNetworkConfig = {
    name: "Fantom Testnet",
    networkID: 0xfa2,
    isTestnet: true,
    rpcUrl: () => `https://rpc.testnet.fantom.network/`,
    explorer: StandardExplorer("https://testnet.ftmscan.com"),
    addresses: {
        GatewayRegistry: "0x1207765B53697a046DCF4AE95bd4dE99ef9D3D3C",
        BasicAdapter: "0x07deB3917d234f787AEd86E0c88E829277D4a33b",
    },
};

export const fantomDevnetConfig: EvmNetworkConfig = {
    ...fantomTestnetConfig,
    addresses: {
        GatewayRegistry: "0xD881213F5ABF783d93220e6bD3Cc21706A8dc1fC",
        BasicAdapter: "0xD087b0540e172553c12DEEeCDEf3dFD21Ec02066",
    },
};

export class Fantom extends Ethereum {
    public static chain = "Fantom";
    public name = Fantom.chain;
    public feeAsset: string = "FTM";

    public static configMap = {
        [RenNetwork.Testnet]: fantomTestnetConfig,
        [RenNetwork.Mainnet]: fantomMainnetConfig,
    };
    public configMap = Fantom.configMap;

    constructor(
        renNetwork: EvmNetworkInput,
        web3Provider: EthProvider,
        config?: EthereumClassConfig,
    ) {
        super(renNetwork, web3Provider, {
            ...config,
        });
    }
}
