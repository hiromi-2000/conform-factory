import { z } from "zod/v4";

/**
 * @description 従業員のスキーマ
 */
const employeeSchema = z.object({
  name: z.string().min(1),
  role: z.enum(["Manager", "Engineer", "Designer", "HR"]),
  email: z.email(),
  contact: z.object({
    workPhone: z.string().min(10),
    personalPhone: z.string().optional(),
  }),
  projects: z.array(z.string()).max(5),
});

/**
 * @description 部署のスキーマ
 */
export const departmentSchema = z.object({
  name: z.string().min(1),
  employees: z.array(employeeSchema).min(1),
});

/**
 * @description クライアントのスキーマ
 */
const clientSchema = z.object({
  companyName: z.string().min(1),
  contactPerson: z.string().min(1),
  contactEmail: z.email(),
});

/**
 * @description 組織のスキーマ
 */
export const organizationSchema = z.object({
  organizationName: z.string().min(1),
  establishedDate: z.date(),
  address: z.object({
    country: z.string().min(1),
    zipCode: z.string().min(1),
    state: z.string().min(1),
    city: z.string().min(1),
    street: z.string().min(1),
  }),
  departments: z.array(departmentSchema).min(1),
  clients: z.array(clientSchema).optional(),
});
