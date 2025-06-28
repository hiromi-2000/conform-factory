import {
  useForm as useConformForm,
  useField,
  useFormMetadata,
  type Submission,
} from "@conform-to/react";
import { z } from "zod/v4";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { Form } from "./_form-factory/form";
import type {
  FormType,
  FormError,
  FormSchema,
  PathValue,
  Paths,
} from "./_form-factory/type";
import { customError } from "../zod/customError";

export const createForm = <T extends FormSchema, F extends string>(
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
          error: customError,
        }) as Submission<z.output<T>, FormError>;
      },
      id: formName,
      constraint: getZodConstraint(schema),
      ...options,
    });
  };

  const useTypedField = <P extends Paths<z.output<T>> | (string & {})>(
    name: P
  ) => {
    return useField<PathValue<z.output<T>, P & string>, z.output<T>, FormError>(
      name,
      {
        formId: formName,
      }
    );
  };

  const useTypedFormMetadata = () =>
    useFormMetadata<z.output<T>, FormError>(formName);

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
