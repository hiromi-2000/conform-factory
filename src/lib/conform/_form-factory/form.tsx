import { FormProvider, FormStateInput, getFormProps } from "@conform-to/react";
import {
  Form as AriaForm,
  type FormProps as AriaFormProps,
} from "react-aria-components";
import type { FormSchema, FormType } from "./type";

export type FormProps<T extends FormSchema> = AriaFormProps & {
  form: ReturnType<FormType<T>>[0];
};

export const Form = <T extends FormSchema>({
  form,
  children,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider context={form.context}>
      <AriaForm {...props} {...getFormProps(form)}>
        {children}
      </AriaForm>
      <FormStateInput />
    </FormProvider>
  );
};
