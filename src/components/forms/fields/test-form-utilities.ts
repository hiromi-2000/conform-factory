import { createForm } from "@/lib/conform/createForm";
import { testFormSchema } from "./test-form-schema";

export const { TestForm, useTestForm, useTestField, useTestFormMetadata } =
  createForm(testFormSchema, "Test");
