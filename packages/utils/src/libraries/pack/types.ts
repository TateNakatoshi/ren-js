/* eslint-disable @typescript-eslint/no-explicit-any */

import BigNumber from "bignumber.js";

export enum PackPrimitive {
    Bool = "bool",
    U8 = "u8",
    U16 = "u16",
    U32 = "u32",
    U64 = "u64",
    U128 = "u128",
    U256 = "u256",
    Str = "string",
    Bytes = "bytes",
    Bytes32 = "bytes32",
    Bytes65 = "bytes65",
}

export interface PackStructType<
    T extends Array<{ [name: string]: PackTypeDefinition }> = Array<{
        [name: string]: PackTypeDefinition;
    }>,
> {
    struct: T;
}

export interface PackListType<
    T extends PackTypeDefinition = PackTypeDefinition,
> {
    list: T;
}

export type PackNilType = "nil";

export type PackType = PackPrimitive | PackNilType | "list" | "struct";

export type MarshalledPackArray<T> = T[];
export type MarshalledPackStruct<T extends object> = T;

export type Marshalled<Type extends PackType> = Type extends PackPrimitive.Bool
    ? boolean
    : Type extends PackPrimitive.U8
    ? string
    : Type extends PackPrimitive.U16
    ? string
    : Type extends PackPrimitive.U32
    ? string
    : Type extends PackPrimitive.U64
    ? string
    : Type extends PackPrimitive.U128
    ? string
    : Type extends PackPrimitive.U256
    ? string
    : Type extends PackPrimitive.Str
    ? string
    : Type extends PackPrimitive.Bytes
    ? string
    : Type extends PackPrimitive.Bytes32
    ? string
    : Type extends PackPrimitive.Bytes65
    ? string
    : Type extends PackNilType
    ? string
    : Type extends "list"
    ? any[]
    : Type extends "struct"
    ? any
    : never;

export type Unmarshalled<Type extends PackType> =
    Type extends PackPrimitive.Bool
        ? boolean
        : Type extends PackPrimitive.U8
        ? BigNumber
        : Type extends PackPrimitive.U16
        ? BigNumber
        : Type extends PackPrimitive.U32
        ? BigNumber
        : Type extends PackPrimitive.U64
        ? BigNumber
        : Type extends PackPrimitive.U128
        ? BigNumber
        : Type extends PackPrimitive.U256
        ? BigNumber
        : Type extends PackPrimitive.Str
        ? string
        : Type extends PackPrimitive.Bytes
        ? Buffer
        : Type extends PackPrimitive.Bytes32
        ? Buffer
        : Type extends PackPrimitive.Bytes65
        ? Buffer
        : Type extends PackNilType
        ? undefined
        : Type extends "list"
        ? any[]
        : Type extends "struct"
        ? any
        : never;

export type PackTypeDefinition =
    | PackPrimitive
    | PackStructType
    | PackListType
    | PackNilType;

export interface TypedPackValue<
    T extends PackTypeDefinition = PackTypeDefinition,
    V = any,
> {
    t: T;
    v: V;
}
