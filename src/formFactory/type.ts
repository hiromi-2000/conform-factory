import type { useField, useForm, useFormMetadata } from "@conform-to/react";
import { z } from "zod/v4";
export type SimpleSchema = z.ZodObject<z.ZodRawShape>;

export type UnionSchema = z.ZodUnion<
  readonly [SimpleSchema, ...SimpleSchema[]]
>;

export type DiscriminatedUnionSchema = z.ZodDiscriminatedUnion<
  [SimpleSchema, ...SimpleSchema[]]
>;

export type FormSchema = SimpleSchema | UnionSchema | DiscriminatedUnionSchema;

/**
 * オブジェクトTから、指定されたパスPに対応する値の型を解決します。
 * 不正なパスが指定された場合は `never` を返します。
 *
 * @example
 * type MyType = { a: { b: string; c: number[] } };
 * type B = PathValue<MyType, 'a.b'>; // string
 * type C = PathValue<MyType, 'a.c[0]'>; // number
 */
export type PathValue<T, P extends string> = T extends object
  ? P extends `${infer Key}.${infer Rest}`
    ? Key extends `${infer K}[${number}]`
      ? K extends keyof T
        ? T[K] extends readonly (infer E)[]
          ? PathValue<E, Rest>
          : never
        : never
      : Key extends keyof T
        ? PathValue<T[Key], Rest>
        : never
    : P extends `${infer K}[${number}]`
      ? K extends keyof T
        ? T[K] extends readonly (infer E)[]
          ? E
          : never
        : never
      : P extends keyof T
        ? T[P]
        : never
  : never;

/**
 * オブジェクトTから、ドット記法でアクセス可能なすべてのパスのUnion型を生成します。
 *
 * この型は、エディタの入力補完を支援するために使用されます。
 * 再帰的な構造を持ち、オブジェクトのネストと配列に対応します。
 *
 * @template T - パスを生成する対象のオブジェクト型。
 * @template D - 再帰深度を制御するためのカウンタ。`Prev`と組み合わせて使用します。
 *
 * @example
 * type MyType = { a: { b: string; c: number[] } };
 * type MyPaths = Paths<MyType>; // "a" | "a.b" | "a.c" | "a.c[number]"
 *
 * // 深度を手動で変更する場合
 * type MyPathsWithCustomDepth = Paths<MyType, 20>;
 *
 * @note
 * この型は再帰的に自身の型を参照しており、非常に深いオブジェクト構造を渡すと
 * TypeScriptコンパイラが "Type instantiation is excessively deep and possibly infinite."
 * というエラーを出す可能性があります。その場合は、手動で再帰深度をより大きな値に設定してください。
 */

/**
 * 0から始まる連続した数値のタプルを生成するヘルパー型。
 * `Prev`型をプログラムで生成するために使用されます。
 * @example
 * // [0, 1, 2]
 * type Sample = TupleOf<3>;
 */
type TupleOf<N extends number, T extends number[] = []> = T["length"] extends N
  ? T
  : TupleOf<N, [...T, T["length"]]>;

export type Prev = [never, ...TupleOf<11>, ...never[]];
export type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends
        | string
        | number
        | boolean
        | symbol
        | bigint
        | null
        | undefined
        | Date
    ? never
    : T extends readonly (infer U)[] // Tが配列の場合
      ? // 配列自身 (`[number]`) と、その要素のパス (`[number].childPath`) を生成
        | `[${number}]`
          | (Paths<U, Prev[D]> extends infer P extends string
              ? `[${number}].${P}`
              : never)
      : T extends object // Tがオブジェクトの場合
        ? // 各キーに対して、キー名 (`key`) と、ネストしたパス (`key.childPath`) を生成
          {
            [K in keyof T]-?: K extends string | number
              ?
                  | `${K}`
                  | (Paths<T[K], Prev[D]> extends infer P extends string
                      ? `${K}.${P}`
                      : never)
              : never;
          }[keyof T]
        : never;

export type FormError = string[];
export type FormType<T extends FormSchema> = typeof useForm<
  z.input<T>,
  z.output<T>,
  FormError
>;

export type FieldType<T extends FormSchema> = typeof useField<
  Paths<z.output<T>>,
  z.output<T>,
  FormError
>;

export type FormMetadataType<T extends FormSchema> = typeof useFormMetadata<
  z.output<T>,
  FormError
>;
