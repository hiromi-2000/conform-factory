import { formFactory } from "../../../formFactory";
import { contactFormSchema } from "../../../schemas";

export const {
  useContactForm,
  ContactForm,
  useContactField,
  useContactFormMetadata,
} = formFactory(contactFormSchema, "Contact");
