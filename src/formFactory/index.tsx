import {
  useForm as useConformForm,
  useField,
  useFormMetadata,
  type Submission,
} from "@conform-to/react";
import type { FormSchema } from "../schemas/types";
import type z from "zod/v4";
import { parseWithZod } from "@conform-to/zod/v4";
import { Form } from "./form";

/**
 * パス文字列（例: 'user.name', 'items[0].id'）を解析し、
 * オブジェクトTから対応する値の型を再帰的に解決するユーティリティ型。
 * @template T - 型を解決する対象のオブジェクト。
 * @template P - パスを表す文字列リテラル型。
 */
type PathValue<T, P extends string> = P extends `${infer Key}.${infer Rest}`
  ? Key extends `${infer K}[${number}]`
    ? K extends keyof T
      ? T[K] extends ReadonlyArray<infer E>
        ? PathValue<E, Rest>
        : any
      : any
    : Key extends keyof T
      ? PathValue<T[Key], Rest>
      : any
  : P extends `${infer K}[${number}]`
    ? K extends keyof T
      ? T[K] extends ReadonlyArray<infer E>
        ? E
        : any
      : any
    : P extends keyof T
      ? T[P]
      : any;

// 補完をある程度効かせるための簡易的なパス生成型
// 注意: 可変長配列のインデックスは '[number]' となり、具体的な数値は補完されません
type Prev = [never, 0, 1, 2, 3];
type Paths<T, D extends number = 3> = [D] extends [never]
  ? never
  : T extends ReadonlyArray<infer U>
    ?
        | `[${number}]`
        | (Paths<U, Prev[D]> extends infer P extends string
            ? `[${number}].${P}`
            : never)
    : T extends object
      ? {
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
export type FormType<T extends FormSchema> = typeof useConformForm<
  z.input<T>,
  z.output<T>,
  FormError
>;

export type FieldType<T extends FormSchema> = typeof useField<
  any, // ここはanyにしておく
  z.output<T>,
  FormError
>;

export type FormMetadataType<T extends FormSchema> = typeof useFormMetadata<
  z.output<T>,
  FormError
>;

export const formFactory = <T extends FormSchema, F extends string>(
  schema: T,
  formName: F
) => {
  const useTypedForm = (
    options: Omit<Parameters<FormType<typeof schema>>[0], "onValidate">
  ) => {
    return useConformForm({
      onValidate: ({ formData }) => {
        return parseWithZod(formData, {
          schema,
        }) as Submission<z.output<T>, FormError>;
      },
      ...options,
    });
  };

  const useTypedField = <P extends Paths<z.output<T>> | (string & {})>(
    name: P,
    options?: Parameters<FieldType<T>>[1]
  ) => {
    return useField<PathValue<z.output<T>, P & string>, z.output<T>, FormError>(
      name as any,
      {
        formId: options?.formId,
      }
    );
  };

  const useTypedFormMetadata = useFormMetadata<z.output<T>, FormError>;

  return {
    [`use${formName}Form`]: useTypedForm,
    [`use${formName}Field`]: useTypedField,
    [`${formName}Form`]: Form<T>,
    [`use${formName}FormMetadata`]: useTypedFormMetadata,
  } as {
    [K in `use${F}Form`]: typeof useTypedForm;
  } & {
    [K in `use${F}Field`]: typeof useTypedField;
  } & {
    [K in `${F}Form`]: typeof Form<T>;
  } & {
    [K in `use${F}FormMetadata`]: typeof useTypedFormMetadata;
  };
};
