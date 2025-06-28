import { createForm } from "@/lib/conform/createForm";
import { organizationSchema } from "./organization-schema";

export const {
  useOrganizationForm,
  useOrganizationField,
  OrganizationForm,
  useOrganizationFormMetadata,
} = createForm(organizationSchema, "Organization");
