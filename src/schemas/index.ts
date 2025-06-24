import type { FormSchema } from "./types";

// ユーザー登録スキーマ
export {
  userRegistrationSchema,
  userRegistrationPartialSchema,
  userFieldSchemas,
  validateUserRegistration,
  type UserRegistrationData,
  type UserRegistrationPartialData,
} from "./userSchema";

// 商品登録スキーマ
export {
  productRegistrationSchema,
  productRegistrationPartialSchema,
  productFieldSchemas,
  productCategories,
  productConditions,
  validateProductRegistration,
  type ProductRegistrationData,
  type ProductRegistrationPartialData,
} from "./productSchema";

// お問い合わせスキーマ
export {
  contactFormSchema,
  simpleContactFormSchema,
  contactFormPartialSchema,
  contactFieldSchemas,
  contactTypes,
  priorityLevels,
  validateContactForm,
  validateSimpleContactForm,
  type ContactFormData,
  type SimpleContactFormData,
  type ContactFormPartialData,
} from "./contactSchema";

// 動的フォームスキーマ
export {
  dynamicFormConfigSchema,
  dynamicFieldSchema,
  dynamicFormDataSchema,
  validationRuleSchema,
  fieldOptionSchema,
  conditionalRuleSchema,
  fieldTypes,
  validationRuleTypes,
  validateDynamicFormConfig,
  validateDynamicField,
  validateDynamicFormData,
  createFieldId,
  getFieldDefaultValue,
  type DynamicFormConfig,
  type DynamicFieldConfig,
  type DynamicFormData,
  type FieldType,
  type ValidationRuleType,
  type ValidationRule,
  type FieldOption,
  type ConditionalRule,
} from "./dynamicSchema";

// 共通バリデーション関数
export const validateSchema = <T extends FormSchema>(
  schema: T,
  data: unknown
) => {
  return schema.safeParse(data);
};
