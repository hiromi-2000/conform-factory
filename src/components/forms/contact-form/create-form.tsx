import { formFactory } from "../../../formFactory";
import { contactFormSchema } from "../../../schemas";

export const { useForm, Form, useField, useFormMetadata } =
  formFactory(contactFormSchema);
