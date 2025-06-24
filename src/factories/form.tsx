import { FormProvider, FormStateInput } from "@conform-to/react";
import {
  Form as AriaForm,
  type FormProps as AriaFormProps,
} from "react-aria-components";
import type { FormSchema } from "../schemas/types";
import type { FormType } from "./formFactory";

type FormProps<T extends FormSchema> = AriaFormProps & {
  form: ReturnType<FormType<T>>[0];
};

export const Form = <T extends FormSchema>({
  form,
  children,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider context={form.context}>
      <AriaForm {...props}>{children}</AriaForm>
      <FormStateInput />
    </FormProvider>
  );
};
