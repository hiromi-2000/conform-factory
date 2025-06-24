import { z } from "zod/v4";

// フィールドタイプ定義
export const fieldTypes = [
  "text",
  "email",
  "password",
  "number",
  "tel",
  "url",
  "textarea",
  "select",
  "multiselect",
  "radio",
  "checkbox",
  "file",
  "date",
  "datetime-local",
  "time",
  "color",
  "range",
  "hidden",
] as const;

// バリデーションルールタイプ
export const validationRuleTypes = [
  "required",
  "minLength",
  "maxLength",
  "min",
  "max",
  "pattern",
  "email",
  "url",
  "custom",
] as const;

// 単一のバリデーションルールスキーマ
export const validationRuleSchema = z.object({
  type: z.enum(validationRuleTypes),
  value: z.union([z.string(), z.number(), z.boolean()]).optional(),
  message: z.string(),
});

// フィールドオプション（select, radio等で使用）
export const fieldOptionSchema = z.object({
  label: z.string().min(1, "ラベルを入力してください"),
  value: z.union([z.string(), z.number(), z.boolean()]),
  disabled: z.boolean().default(false),
  selected: z.boolean().default(false),
});

// 条件分岐ルール
export const conditionalRuleSchema = z.object({
  dependsOn: z.string().min(1, "依存フィールドを指定してください"),
  condition: z.enum([
    "equals",
    "notEquals",
    "contains",
    "notContains",
    "greaterThan",
    "lessThan",
  ]),
  value: z.union([z.string(), z.number(), z.boolean()]),
  action: z.enum(["show", "hide", "enable", "disable", "require", "optional"]),
});

// 動的フィールド定義スキーマ
export const dynamicFieldSchema = z.object({
  // 基本設定
  id: z
    .string()
    .min(1, "フィールドIDを入力してください")
    .regex(
      /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      "フィールドIDは英字から始まり、英数字、アンダースコア、ハイフンのみ使用できます"
    ),

  name: z
    .string()
    .min(1, "フィールド名を入力してください")
    .max(100, "フィールド名は100文字以内で入力してください"),

  type: z.enum(fieldTypes, {
    errorMap: () => ({ message: "フィールドタイプを選択してください" }),
  }),

  label: z
    .string()
    .min(1, "ラベルを入力してください")
    .max(200, "ラベルは200文字以内で入力してください"),

  placeholder: z
    .string()
    .max(200, "プレースホルダーは200文字以内で入力してください")
    .optional(),

  helpText: z
    .string()
    .max(500, "ヘルプテキストは500文字以内で入力してください")
    .optional(),

  // デフォルト値
  defaultValue: z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.array(z.union([z.string(), z.number()])),
    ])
    .optional(),

  // バリデーション
  validations: z.array(validationRuleSchema).default([]),

  // オプション（select, radio, checkboxで使用）
  options: z.array(fieldOptionSchema).optional(),

  // 表示・動作設定
  required: z.boolean().default(false),
  disabled: z.boolean().default(false),
  readonly: z.boolean().default(false),
  hidden: z.boolean().default(false),

  // レイアウト設定
  width: z.enum(["full", "half", "third", "quarter", "auto"]).default("full"),
  order: z.number().int().min(0).default(0),

  // 条件分岐
  conditionalRules: z.array(conditionalRuleSchema).default([]),

  // カスタム属性
  customAttributes: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .optional(),

  // フィールド固有設定
  fieldSpecificSettings: z.record(z.string(), z.any()).optional(),
});

// 動的フォーム設定スキーマ
export const dynamicFormConfigSchema = z
  .object({
    // フォーム基本情報
    id: z
      .string()
      .min(1, "フォームIDを入力してください")
      .regex(
        /^[a-zA-Z][a-zA-Z0-9_-]*$/,
        "フォームIDは英字から始まり、英数字、アンダースコア、ハイフンのみ使用できます"
      ),

    name: z
      .string()
      .min(1, "フォーム名を入力してください")
      .max(200, "フォーム名は200文字以内で入力してください"),

    title: z
      .string()
      .min(1, "フォームタイトルを入力してください")
      .max(200, "フォームタイトルは200文字以内で入力してください"),

    description: z
      .string()
      .max(1000, "フォーム説明は1000文字以内で入力してください")
      .optional(),

    // フィールド定義
    fields: z
      .array(dynamicFieldSchema)
      .min(1, "最低1つのフィールドが必要です")
      .max(100, "フィールドは最大100個まで設定できます"),

    // フォーム設定
    settings: z
      .object({
        // 送信設定
        submitButtonText: z
          .string()
          .max(50, "送信ボタンテキストは50文字以内で入力してください")
          .default("送信"),
        resetButtonText: z
          .string()
          .max(50, "リセットボタンテキストは50文字以内で入力してください")
          .default("リセット"),

        // 動作設定
        enableReset: z.boolean().default(true),
        enableDraft: z.boolean().default(false),
        autoSave: z.boolean().default(false),
        autoSaveInterval: z.number().int().min(10).max(300).default(30), // 秒

        // バリデーション設定
        validateOnBlur: z.boolean().default(true),
        validateOnChange: z.boolean().default(false),
        showErrorSummary: z.boolean().default(true),

        // レイアウト設定
        layout: z.enum(["vertical", "horizontal", "grid"]).default("vertical"),
        columns: z.number().int().min(1).max(4).default(1),
        spacing: z.enum(["compact", "normal", "relaxed"]).default("normal"),

        // スタイリング
        theme: z
          .string()
          .max(50, "テーマ名は50文字以内で入力してください")
          .default("default"),
        customCss: z
          .string()
          .max(5000, "カスタムCSSは5000文字以内で入力してください")
          .optional(),

        // アクセシビリティ
        ariaLabel: z
          .string()
          .max(200, "ARIAラベルは200文字以内で入力してください")
          .optional(),
        ariaDescription: z
          .string()
          .max(500, "ARIA説明は500文字以内で入力してください")
          .optional(),
      })
      .default({}),

    // メタデータ
    metadata: z
      .object({
        version: z.string().default("1.0.0"),
        createdAt: z.string().datetime().optional(),
        updatedAt: z.string().datetime().optional(),
        createdBy: z
          .string()
          .max(100, "作成者名は100文字以内で入力してください")
          .optional(),
        tags: z
          .array(z.string().max(50, "タグは50文字以内で入力してください"))
          .max(10, "タグは最大10個まで設定できます")
          .default([]),
      })
      .default({}),
  })
  .refine(
    (data) => {
      // フィールドIDの重複チェック
      const fieldIds = data.fields.map((field) => field.id);
      const uniqueIds = new Set(fieldIds);
      return fieldIds.length === uniqueIds.size;
    },
    {
      message: "フィールドIDが重複しています",
      path: ["fields"],
    }
  );

// 動的フォームデータスキーマ（実際のフォーム送信データ）
export const dynamicFormDataSchema = z.record(z.string(), z.any());

// 型エクスポート
export type DynamicFieldConfig = z.infer<typeof dynamicFieldSchema>;
export type DynamicFormConfig = z.infer<typeof dynamicFormConfigSchema>;
export type DynamicFormData = z.infer<typeof dynamicFormDataSchema>;
export type FieldType = (typeof fieldTypes)[number];
export type ValidationRuleType = (typeof validationRuleTypes)[number];
export type ValidationRule = z.infer<typeof validationRuleSchema>;
export type FieldOption = z.infer<typeof fieldOptionSchema>;
export type ConditionalRule = z.infer<typeof conditionalRuleSchema>;

// バリデーション関数
export const validateDynamicFormConfig = (data: unknown) => {
  return dynamicFormConfigSchema.safeParse(data);
};

export const validateDynamicField = (data: unknown) => {
  return dynamicFieldSchema.safeParse(data);
};

export const validateDynamicFormData = (data: unknown) => {
  return dynamicFormDataSchema.safeParse(data);
};

// ユーティリティ関数
export const createFieldId = (label: string): string => {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^_|_$/g, "");
};

export const getFieldDefaultValue = (field: DynamicFieldConfig) => {
  if (field.defaultValue !== undefined) {
    return field.defaultValue;
  }

  switch (field.type) {
    case "checkbox":
      return false;
    case "multiselect":
      return [];
    case "number":
    case "range":
      return 0;
    default:
      return "";
  }
};
