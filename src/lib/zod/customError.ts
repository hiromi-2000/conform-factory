import * as z from "zod/v4";
import type { $ZodErrorMap } from "zod/v4/core";

z.config(z.locales.ja());

export const customError: $ZodErrorMap = (issue) => {
  // add your custom error message here
  return issue.message;
};
