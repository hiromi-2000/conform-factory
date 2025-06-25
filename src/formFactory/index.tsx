import {
  useForm as useConformForm,
  useField,
  useFormMetadata,
  type Submission,
} from "@conform-to/react";
import type { z } from "zod/v4";
import { parseWithZod } from "@conform-to/zod/v4";
import { Form } from "./form";
import type {
  FormType,
  FormError,
  FormSchema,
  PathValue,
  FieldType,
  Paths,
} from "./type";

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
      name,
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
