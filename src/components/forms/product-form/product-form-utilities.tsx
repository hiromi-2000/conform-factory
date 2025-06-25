import { formFactory } from "../../../formFactory";
import { productRegistrationSchema } from "../../../schemas";

export const {
  useProductForm,
  ProductForm,
  useProductField,
  useProductFormMetadata,
} = formFactory(productRegistrationSchema, "Product");
