/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
    BaseContract,
    BigNumber,
    BigNumberish,
    CallOverrides,
    ContractTransaction,
    ethers,
    EventFilter,
    Overrides,
    PopulatedTransaction,
    Signer,
} from "ethers";

import { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";

import { TypedEvent, TypedEventFilter, TypedListener } from "./commons";

interface LockGatewayV3Interface extends ethers.utils.Interface {
    functions: {
        "__GatewayStateManager_init(string,string,address,address)": FunctionFragment;
        "__LockGateway_init(string,string,address,address)": FunctionFragment;
        "_status(bytes32)": FunctionFragment;
        "asset()": FunctionFragment;
        "chain()": FunctionFragment;
        "lock(string,string,bytes,uint256)": FunctionFragment;
        "nextN()": FunctionFragment;
        "owner()": FunctionFragment;
        "previousGateway()": FunctionFragment;
        "release(bytes32,uint256,bytes32,bytes)": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "selectorHash()": FunctionFragment;
        "signatureVerifier()": FunctionFragment;
        "status(bytes32)": FunctionFragment;
        "token()": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "updateAsset(string)": FunctionFragment;
        "updateChain(string)": FunctionFragment;
        "updatePreviousGateway(address)": FunctionFragment;
        "updateSignatureVerifier(address)": FunctionFragment;
        "updateToken(address)": FunctionFragment;
    };

    encodeFunctionData(
        functionFragment: "__GatewayStateManager_init",
        values: [string, string, string, string],
    ): string;
    encodeFunctionData(
        functionFragment: "__LockGateway_init",
        values: [string, string, string, string],
    ): string;
    encodeFunctionData(
        functionFragment: "_status",
        values: [BytesLike],
    ): string;
    encodeFunctionData(functionFragment: "asset", values?: undefined): string;
    encodeFunctionData(functionFragment: "chain", values?: undefined): string;
    encodeFunctionData(
        functionFragment: "lock",
        values: [string, string, BytesLike, BigNumberish],
    ): string;
    encodeFunctionData(functionFragment: "nextN", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(
        functionFragment: "previousGateway",
        values?: undefined,
    ): string;
    encodeFunctionData(
        functionFragment: "release",
        values: [BytesLike, BigNumberish, BytesLike, BytesLike],
    ): string;
    encodeFunctionData(
        functionFragment: "renounceOwnership",
        values?: undefined,
    ): string;
    encodeFunctionData(
        functionFragment: "selectorHash",
        values?: undefined,
    ): string;
    encodeFunctionData(
        functionFragment: "signatureVerifier",
        values?: undefined,
    ): string;
    encodeFunctionData(functionFragment: "status", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "token", values?: undefined): string;
    encodeFunctionData(
        functionFragment: "transferOwnership",
        values: [string],
    ): string;
    encodeFunctionData(
        functionFragment: "updateAsset",
        values: [string],
    ): string;
    encodeFunctionData(
        functionFragment: "updateChain",
        values: [string],
    ): string;
    encodeFunctionData(
        functionFragment: "updatePreviousGateway",
        values: [string],
    ): string;
    encodeFunctionData(
        functionFragment: "updateSignatureVerifier",
        values: [string],
    ): string;
    encodeFunctionData(
        functionFragment: "updateToken",
        values: [string],
    ): string;

    decodeFunctionResult(
        functionFragment: "__GatewayStateManager_init",
        data: BytesLike,
    ): Result;
    decodeFunctionResult(
        functionFragment: "__LockGateway_init",
        data: BytesLike,
    ): Result;
    decodeFunctionResult(functionFragment: "_status", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "asset", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "chain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nextN", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(
        functionFragment: "previousGateway",
        data: BytesLike,
    ): Result;
    decodeFunctionResult(functionFragment: "release", data: BytesLike): Result;
    decodeFunctionResult(
        functionFragment: "renounceOwnership",
        data: BytesLike,
    ): Result;
    decodeFunctionResult(
        functionFragment: "selectorHash",
        data: BytesLike,
    ): Result;
    decodeFunctionResult(
        functionFragment: "signatureVerifier",
        data: BytesLike,
    ): Result;
    decodeFunctionResult(functionFragment: "status", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
    decodeFunctionResult(
        functionFragment: "transferOwnership",
        data: BytesLike,
    ): Result;
    decodeFunctionResult(
        functionFragment: "updateAsset",
        data: BytesLike,
    ): Result;
    decodeFunctionResult(
        functionFragment: "updateChain",
        data: BytesLike,
    ): Result;
    decodeFunctionResult(
        functionFragment: "updatePreviousGateway",
        data: BytesLike,
    ): Result;
    decodeFunctionResult(
        functionFragment: "updateSignatureVerifier",
        data: BytesLike,
    ): Result;
    decodeFunctionResult(
        functionFragment: "updateToken",
        data: BytesLike,
    ): Result;

    events: {
        "LogAssetUpdated(string,bytes32)": EventFragment;
        "LogChainUpdated(string,bytes32)": EventFragment;
        "LogLockToChain(string,string,bytes,uint256,uint256,string,string)": EventFragment;
        "LogPreviousGatewayUpdated(address)": EventFragment;
        "LogRelease(address,uint256,bytes32,bytes32)": EventFragment;
        "LogSignatureVerifierUpdated(address)": EventFragment;
        "LogTokenUpdated(address)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
    };

    getEvent(nameOrSignatureOrTopic: "LogAssetUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LogChainUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LogLockToChain"): EventFragment;
    getEvent(
        nameOrSignatureOrTopic: "LogPreviousGatewayUpdated",
    ): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LogRelease"): EventFragment;
    getEvent(
        nameOrSignatureOrTopic: "LogSignatureVerifierUpdated",
    ): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LogTokenUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type LogAssetUpdatedEvent = TypedEvent<
    [string, string] & { _asset: string; _selectorHash: string }
>;

export type LogChainUpdatedEvent = TypedEvent<
    [string, string] & { _chain: string; _selectorHash: string }
>;

export type LogLockToChainEvent = TypedEvent<
    [string, string, string, BigNumber, BigNumber, string, string] & {
        recipientAddress: string;
        recipientChain: string;
        recipientPayload: string;
        amount: BigNumber;
        lockNonce: BigNumber;
        recipientAddressIndexed: string;
        recipientChainIndexed: string;
    }
>;

export type LogPreviousGatewayUpdatedEvent = TypedEvent<
    [string] & { _newPreviousGateway: string }
>;

export type LogReleaseEvent = TypedEvent<
    [string, BigNumber, string, string] & {
        recipient: string;
        amount: BigNumber;
        sigHash: string;
        nHash: string;
    }
>;

export type LogSignatureVerifierUpdatedEvent = TypedEvent<
    [string] & { _newSignatureVerifier: string }
>;

export type LogTokenUpdatedEvent = TypedEvent<[string] & { _newToken: string }>;

export type OwnershipTransferredEvent = TypedEvent<
    [string, string] & { previousOwner: string; newOwner: string }
>;

export interface LockGatewayV3 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;

    listeners<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>,
    ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
    off<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>,
    ): this;
    on<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>,
    ): this;
    once<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>,
    ): this;
    removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>,
    ): this;
    removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    ): this;

    listeners(eventName?: string): Array<Listener>;
    off(eventName: string, listener: Listener): this;
    on(eventName: string, listener: Listener): this;
    once(eventName: string, listener: Listener): this;
    removeListener(eventName: string, listener: Listener): this;
    removeAllListeners(eventName?: string): this;

    queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
        event: TypedEventFilter<EventArgsArray, EventArgsObject>,
        fromBlockOrBlockhash?: string | number | undefined,
        toBlock?: string | number | undefined,
    ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

    interface: LockGatewayV3Interface;

    functions: {
        __GatewayStateManager_init(
            chain_: string,
            asset_: string,
            signatureVerifier_: string,
            token_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<ContractTransaction>;

        __LockGateway_init(
            chain_: string,
            asset_: string,
            signatureVerifier_: string,
            token: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<ContractTransaction>;

        _status(arg0: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;

        asset(overrides?: CallOverrides): Promise<[string]>;

        chain(overrides?: CallOverrides): Promise<[string]>;

        lock(
            recipientAddress_: string,
            recipientChain_: string,
            recipientPayload_: BytesLike,
            amount_: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<ContractTransaction>;

        nextN(overrides?: CallOverrides): Promise<[BigNumber]>;

        owner(overrides?: CallOverrides): Promise<[string]>;

        previousGateway(overrides?: CallOverrides): Promise<[string]>;

        release(
            pHash_: BytesLike,
            amount_: BigNumberish,
            nHash_: BytesLike,
            sig_: BytesLike,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<ContractTransaction>;

        renounceOwnership(
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<ContractTransaction>;

        selectorHash(overrides?: CallOverrides): Promise<[string]>;

        signatureVerifier(overrides?: CallOverrides): Promise<[string]>;

        status(hash_: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;

        token(overrides?: CallOverrides): Promise<[string]>;

        transferOwnership(
            newOwner: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<ContractTransaction>;

        updateAsset(
            nextAsset_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<ContractTransaction>;

        updateChain(
            nextChain_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<ContractTransaction>;

        updatePreviousGateway(
            nextPreviousGateway_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<ContractTransaction>;

        updateSignatureVerifier(
            nextSignatureVerifier_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<ContractTransaction>;

        updateToken(
            nextToken_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<ContractTransaction>;
    };

    __GatewayStateManager_init(
        chain_: string,
        asset_: string,
        signatureVerifier_: string,
        token_: string,
        overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    __LockGateway_init(
        chain_: string,
        asset_: string,
        signatureVerifier_: string,
        token: string,
        overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    _status(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    asset(overrides?: CallOverrides): Promise<string>;

    chain(overrides?: CallOverrides): Promise<string>;

    lock(
        recipientAddress_: string,
        recipientChain_: string,
        recipientPayload_: BytesLike,
        amount_: BigNumberish,
        overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    nextN(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    previousGateway(overrides?: CallOverrides): Promise<string>;

    release(
        pHash_: BytesLike,
        amount_: BigNumberish,
        nHash_: BytesLike,
        sig_: BytesLike,
        overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    renounceOwnership(
        overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    selectorHash(overrides?: CallOverrides): Promise<string>;

    signatureVerifier(overrides?: CallOverrides): Promise<string>;

    status(hash_: BytesLike, overrides?: CallOverrides): Promise<boolean>;

    token(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
        newOwner: string,
        overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    updateAsset(
        nextAsset_: string,
        overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    updateChain(
        nextChain_: string,
        overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    updatePreviousGateway(
        nextPreviousGateway_: string,
        overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    updateSignatureVerifier(
        nextSignatureVerifier_: string,
        overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    updateToken(
        nextToken_: string,
        overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    callStatic: {
        __GatewayStateManager_init(
            chain_: string,
            asset_: string,
            signatureVerifier_: string,
            token_: string,
            overrides?: CallOverrides,
        ): Promise<void>;

        __LockGateway_init(
            chain_: string,
            asset_: string,
            signatureVerifier_: string,
            token: string,
            overrides?: CallOverrides,
        ): Promise<void>;

        _status(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

        asset(overrides?: CallOverrides): Promise<string>;

        chain(overrides?: CallOverrides): Promise<string>;

        lock(
            recipientAddress_: string,
            recipientChain_: string,
            recipientPayload_: BytesLike,
            amount_: BigNumberish,
            overrides?: CallOverrides,
        ): Promise<BigNumber>;

        nextN(overrides?: CallOverrides): Promise<BigNumber>;

        owner(overrides?: CallOverrides): Promise<string>;

        previousGateway(overrides?: CallOverrides): Promise<string>;

        release(
            pHash_: BytesLike,
            amount_: BigNumberish,
            nHash_: BytesLike,
            sig_: BytesLike,
            overrides?: CallOverrides,
        ): Promise<BigNumber>;

        renounceOwnership(overrides?: CallOverrides): Promise<void>;

        selectorHash(overrides?: CallOverrides): Promise<string>;

        signatureVerifier(overrides?: CallOverrides): Promise<string>;

        status(hash_: BytesLike, overrides?: CallOverrides): Promise<boolean>;

        token(overrides?: CallOverrides): Promise<string>;

        transferOwnership(
            newOwner: string,
            overrides?: CallOverrides,
        ): Promise<void>;

        updateAsset(
            nextAsset_: string,
            overrides?: CallOverrides,
        ): Promise<void>;

        updateChain(
            nextChain_: string,
            overrides?: CallOverrides,
        ): Promise<void>;

        updatePreviousGateway(
            nextPreviousGateway_: string,
            overrides?: CallOverrides,
        ): Promise<void>;

        updateSignatureVerifier(
            nextSignatureVerifier_: string,
            overrides?: CallOverrides,
        ): Promise<void>;

        updateToken(
            nextToken_: string,
            overrides?: CallOverrides,
        ): Promise<void>;
    };

    filters: {
        "LogAssetUpdated(string,bytes32)"(
            _asset?: null,
            _selectorHash?: null,
        ): TypedEventFilter<
            [string, string],
            { _asset: string; _selectorHash: string }
        >;

        LogAssetUpdated(
            _asset?: null,
            _selectorHash?: null,
        ): TypedEventFilter<
            [string, string],
            { _asset: string; _selectorHash: string }
        >;

        "LogChainUpdated(string,bytes32)"(
            _chain?: null,
            _selectorHash?: null,
        ): TypedEventFilter<
            [string, string],
            { _chain: string; _selectorHash: string }
        >;

        LogChainUpdated(
            _chain?: null,
            _selectorHash?: null,
        ): TypedEventFilter<
            [string, string],
            { _chain: string; _selectorHash: string }
        >;

        "LogLockToChain(string,string,bytes,uint256,uint256,string,string)"(
            recipientAddress?: null,
            recipientChain?: null,
            recipientPayload?: null,
            amount?: null,
            lockNonce?: BigNumberish | null,
            recipientAddressIndexed?: string | null,
            recipientChainIndexed?: string | null,
        ): TypedEventFilter<
            [string, string, string, BigNumber, BigNumber, string, string],
            {
                recipientAddress: string;
                recipientChain: string;
                recipientPayload: string;
                amount: BigNumber;
                lockNonce: BigNumber;
                recipientAddressIndexed: string;
                recipientChainIndexed: string;
            }
        >;

        LogLockToChain(
            recipientAddress?: null,
            recipientChain?: null,
            recipientPayload?: null,
            amount?: null,
            lockNonce?: BigNumberish | null,
            recipientAddressIndexed?: string | null,
            recipientChainIndexed?: string | null,
        ): TypedEventFilter<
            [string, string, string, BigNumber, BigNumber, string, string],
            {
                recipientAddress: string;
                recipientChain: string;
                recipientPayload: string;
                amount: BigNumber;
                lockNonce: BigNumber;
                recipientAddressIndexed: string;
                recipientChainIndexed: string;
            }
        >;

        "LogPreviousGatewayUpdated(address)"(
            _newPreviousGateway?: string | null,
        ): TypedEventFilter<[string], { _newPreviousGateway: string }>;

        LogPreviousGatewayUpdated(
            _newPreviousGateway?: string | null,
        ): TypedEventFilter<[string], { _newPreviousGateway: string }>;

        "LogRelease(address,uint256,bytes32,bytes32)"(
            recipient?: string | null,
            amount?: null,
            sigHash?: BytesLike | null,
            nHash?: BytesLike | null,
        ): TypedEventFilter<
            [string, BigNumber, string, string],
            {
                recipient: string;
                amount: BigNumber;
                sigHash: string;
                nHash: string;
            }
        >;

        LogRelease(
            recipient?: string | null,
            amount?: null,
            sigHash?: BytesLike | null,
            nHash?: BytesLike | null,
        ): TypedEventFilter<
            [string, BigNumber, string, string],
            {
                recipient: string;
                amount: BigNumber;
                sigHash: string;
                nHash: string;
            }
        >;

        "LogSignatureVerifierUpdated(address)"(
            _newSignatureVerifier?: string | null,
        ): TypedEventFilter<[string], { _newSignatureVerifier: string }>;

        LogSignatureVerifierUpdated(
            _newSignatureVerifier?: string | null,
        ): TypedEventFilter<[string], { _newSignatureVerifier: string }>;

        "LogTokenUpdated(address)"(
            _newToken?: string | null,
        ): TypedEventFilter<[string], { _newToken: string }>;

        LogTokenUpdated(
            _newToken?: string | null,
        ): TypedEventFilter<[string], { _newToken: string }>;

        "OwnershipTransferred(address,address)"(
            previousOwner?: string | null,
            newOwner?: string | null,
        ): TypedEventFilter<
            [string, string],
            { previousOwner: string; newOwner: string }
        >;

        OwnershipTransferred(
            previousOwner?: string | null,
            newOwner?: string | null,
        ): TypedEventFilter<
            [string, string],
            { previousOwner: string; newOwner: string }
        >;
    };

    estimateGas: {
        __GatewayStateManager_init(
            chain_: string,
            asset_: string,
            signatureVerifier_: string,
            token_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<BigNumber>;

        __LockGateway_init(
            chain_: string,
            asset_: string,
            signatureVerifier_: string,
            token: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<BigNumber>;

        _status(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

        asset(overrides?: CallOverrides): Promise<BigNumber>;

        chain(overrides?: CallOverrides): Promise<BigNumber>;

        lock(
            recipientAddress_: string,
            recipientChain_: string,
            recipientPayload_: BytesLike,
            amount_: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<BigNumber>;

        nextN(overrides?: CallOverrides): Promise<BigNumber>;

        owner(overrides?: CallOverrides): Promise<BigNumber>;

        previousGateway(overrides?: CallOverrides): Promise<BigNumber>;

        release(
            pHash_: BytesLike,
            amount_: BigNumberish,
            nHash_: BytesLike,
            sig_: BytesLike,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<BigNumber>;

        renounceOwnership(
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<BigNumber>;

        selectorHash(overrides?: CallOverrides): Promise<BigNumber>;

        signatureVerifier(overrides?: CallOverrides): Promise<BigNumber>;

        status(hash_: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

        token(overrides?: CallOverrides): Promise<BigNumber>;

        transferOwnership(
            newOwner: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<BigNumber>;

        updateAsset(
            nextAsset_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<BigNumber>;

        updateChain(
            nextChain_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<BigNumber>;

        updatePreviousGateway(
            nextPreviousGateway_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<BigNumber>;

        updateSignatureVerifier(
            nextSignatureVerifier_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<BigNumber>;

        updateToken(
            nextToken_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<BigNumber>;
    };

    populateTransaction: {
        __GatewayStateManager_init(
            chain_: string,
            asset_: string,
            signatureVerifier_: string,
            token_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<PopulatedTransaction>;

        __LockGateway_init(
            chain_: string,
            asset_: string,
            signatureVerifier_: string,
            token: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<PopulatedTransaction>;

        _status(
            arg0: BytesLike,
            overrides?: CallOverrides,
        ): Promise<PopulatedTransaction>;

        asset(overrides?: CallOverrides): Promise<PopulatedTransaction>;

        chain(overrides?: CallOverrides): Promise<PopulatedTransaction>;

        lock(
            recipientAddress_: string,
            recipientChain_: string,
            recipientPayload_: BytesLike,
            amount_: BigNumberish,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<PopulatedTransaction>;

        nextN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

        previousGateway(
            overrides?: CallOverrides,
        ): Promise<PopulatedTransaction>;

        release(
            pHash_: BytesLike,
            amount_: BigNumberish,
            nHash_: BytesLike,
            sig_: BytesLike,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<PopulatedTransaction>;

        renounceOwnership(
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<PopulatedTransaction>;

        selectorHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

        signatureVerifier(
            overrides?: CallOverrides,
        ): Promise<PopulatedTransaction>;

        status(
            hash_: BytesLike,
            overrides?: CallOverrides,
        ): Promise<PopulatedTransaction>;

        token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

        transferOwnership(
            newOwner: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<PopulatedTransaction>;

        updateAsset(
            nextAsset_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<PopulatedTransaction>;

        updateChain(
            nextChain_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<PopulatedTransaction>;

        updatePreviousGateway(
            nextPreviousGateway_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<PopulatedTransaction>;

        updateSignatureVerifier(
            nextSignatureVerifier_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<PopulatedTransaction>;

        updateToken(
            nextToken_: string,
            overrides?: Overrides & { from?: string | Promise<string> },
        ): Promise<PopulatedTransaction>;
    };
}
