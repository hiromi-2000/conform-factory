import { createForm } from "@/lib/conform/createForm";
import { userFormSchema } from "./user-form-schema";

export const { UserForm, useUserForm, useUserField, useUserFormMetadata } =
  createForm(userFormSchema, "User");
