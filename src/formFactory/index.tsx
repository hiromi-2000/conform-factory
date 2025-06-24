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
import type { Paths } from "type-fest";

export type FormError = string[];
export type FormType<T extends FormSchema> = typeof useConformForm<
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

export const formFactory = <T extends FormSchema>(schema: T) => {
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

  const useTypedField = (
    name: Extract<Paths<z.output<T>>, string>,
    options?: Parameters<FieldType<T>>[1]
  ) => {
    return useField<
      Extract<Paths<z.output<T>>, string>,
      z.output<T>,
      FormError
    >(name, {
      formId: options?.formId,
    });
  };

  const useTypedFormMetadata = useFormMetadata<z.output<T>, FormError>;

  return {
    useForm: useTypedForm,
    useField: useTypedField,
    Form: Form<T>,
    useFormMetadata: useTypedFormMetadata,
  };
};
