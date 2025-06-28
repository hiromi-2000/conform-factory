import { z } from "zod/v4";

export const testFormSchema = z.object({
  // InputField用
  textInput: z.string().optional(),
  requiredTextInput: z.string().min(1, "このフィールドは必須です"),
  emailInput: z
    .string()
    .email("有効なメールアドレスを入力してください")
    .optional(),

  // SelectField用
  selectInput: z.string().optional(),
  requiredSelectInput: z.string().min(1, "選択は必須です"),

  // TextareaField用
  textareaInput: z.string().optional(),
  requiredTextareaInput: z.string().min(1, "このフィールドは必須です"),

  // CheckboxField用
  checkboxInput: z.boolean().optional(),
  requiredCheckboxInput: z
    .boolean()
    .refine((val) => val === true, "同意が必要です"),

  // DatePickerField用
  dateInput: z.date().optional(),
  requiredDateInput: z.date({ required_error: "日付の選択は必須です" }),
});
