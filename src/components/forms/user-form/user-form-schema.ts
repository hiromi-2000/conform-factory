import { z } from "zod/v4";

export const userFormSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  gender: z.enum(["male", "female", "other"]),
  phoneNumber: z.string().min(10),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),
  income: z.number().min(0),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"]),
  children: z.number().min(0),
  pets: z.number().min(0),
  hobbies: z.array(z.object({ name: z.string(), description: z.string() })),
});
