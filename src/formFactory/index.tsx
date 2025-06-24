import {
  useForm as useConformForm,
  useField,
  useFormMetadata,
  type FieldName,
  type FormId,
} from "@conform-to/react";
import type { FormSchema } from "../schemas/types";
import type z from "zod/v4";
import { parseWithZod } from "@conform-to/zod/v4";
import { Form } from "./form";

export type FormError = string[];
export type FormType<T extends FormSchema> = typeof useConformForm<
  z.input<T>,
  z.output<T>,
  FormError
>;

export type FieldType<T extends FormSchema> = typeof useField<
  FieldName<z.output<T>>,
  z.output<T>,
  FormError
>;

export type FormMetadataType<T extends FormSchema> = typeof useFormMetadata<
  z.output<T>,
  FormError
>;

export const formFactory = (schema: FormSchema) => {
  const useTypedForm = (
    options: Omit<Parameters<FormType<typeof schema>>[0], "onValidate">
  ) => {
    return useConformForm({
      onValidate: ({ formData }) => {
        return parseWithZod(formData, {
          schema,
        });
      },
      ...options,
    });
  };

  const useTypedField = (name: FieldName<z.output<typeof schema>>) => {
    return useField(name);
  };

  const useTypedFormMetadata = (
    formId?: FormId<z.output<typeof schema>, FormError>,
    options?: Parameters<FormMetadataType<typeof schema>>[1]
  ) => {
    return useFormMetadata<z.output<typeof schema>, FormError>(formId, options);
  };

  return {
    useForm: useTypedForm,
    useField: useTypedField,
    Form: Form<typeof schema>,
    useFormMetadata: useTypedFormMetadata,
  };
};
