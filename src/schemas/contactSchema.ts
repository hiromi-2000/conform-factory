import { z } from "zod/v4";

// お問い合わせ種別定義
export const contactTypes = [
  "general",
  "support",
  "sales",
  "technical",
  "billing",
  "partnership",
  "press",
  "other",
] as const;

// 優先度定義
export const priorityLevels = ["low", "normal", "high", "urgent"] as const;

// お問い合わせフォームスキーマ
export const contactFormSchema = z
  .object({
    // 基本情報
    firstName: z
      .string()
      .min(1, "名前を入力してください")
      .max(50, "名前は50文字以内で入力してください")
      .transform((name) => name.trim()),

    lastName: z
      .string()
      .min(1, "姓を入力してください")
      .max(50, "姓は50文字以内で入力してください")
      .transform((name) => name.trim()),

    email: z
      .email("有効なメールアドレスを入力してください")
      .toLowerCase()
      .transform((email) => email.trim()),

    phoneNumber: z
      .string()
      .regex(
        /^0\d{1,4}-\d{1,4}-\d{4}$|^0[789]0-\d{4}-\d{4}$/,
        "電話番号は正しい形式で入力してください（例：03-1234-5678、090-1234-5678）"
      )
      .optional(),

    // 会社情報
    company: z
      .string()
      .max(100, "会社名は100文字以内で入力してください")
      .transform((company) => company.trim())
      .optional(),

    jobTitle: z
      .string()
      .max(50, "職業・役職は50文字以内で入力してください")
      .transform((title) => title.trim())
      .optional(),

    // お問い合わせ内容
    contactType: z.enum(contactTypes, {
      message: "お問い合わせ種別を選択してください",
    }),

    subject: z
      .string()
      .min(1, "件名を入力してください")
      .max(200, "件名は200文字以内で入力してください")
      .transform((subject) => subject.trim()),

    message: z
      .string()
      .min(10, "お問い合わせ内容は10文字以上で入力してください")
      .max(2000, "お問い合わせ内容は2000文字以内で入力してください")
      .transform((message) => message.trim()),

    // 優先度・緊急度
    priority: z
      .enum(priorityLevels, {
        message: "優先度を選択してください",
      })
      .default("normal"),

    // ファイル添付
    attachments: z
      .array(
        z.object({
          fileName: z
            .string()
            .max(255, "ファイル名は255文字以内で入力してください"),
          fileSize: z
            .number()
            .max(10485760, "ファイルサイズは10MB以下である必要があります"), // 10MB
          fileType: z
            .string()
            .regex(
              /^[a-z]+\/[a-z0-9\-+.]+$/,
              "有効なMIMEタイプを指定してください"
            ),
          fileUrl: z.string().url("有効なURL形式で入力してください"),
        })
      )
      .max(5, "添付ファイルは最大5個まで登録できます")
      .optional(),

    // システム情報（トラブルシューティング用）
    systemInfo: z
      .object({
        browser: z
          .string()
          .max(100, "ブラウザ情報は100文字以内で入力してください")
          .optional(),
        operatingSystem: z
          .string()
          .max(100, "OS情報は100文字以内で入力してください")
          .optional(),
        screenResolution: z
          .string()
          .max(50, "画面解像度は50文字以内で入力してください")
          .optional(),
        userAgent: z
          .string()
          .max(500, "ユーザーエージェントは500文字以内で入力してください")
          .optional(),
      })
      .optional(),

    // 連絡先設定
    preferredContactMethod: z
      .enum(["email", "phone", "both"], {
        message: "希望連絡方法を選択してください",
      })
      .default("email"),

    bestTimeToContact: z
      .string()
      .max(100, "連絡希望時間は100文字以内で入力してください")
      .optional(),

    // マーケティング・フォローアップ
    allowMarketingEmails: z.boolean().default(false),
    subscribeToNewsletter: z.boolean().default(false),

    // プライバシー・同意
    privacyPolicyAccepted: z
      .boolean()
      .refine(
        (val) => val === true,
        "プライバシーポリシーに同意する必要があります"
      ),

    // その他
    source: z
      .string()
      .max(100, "参照元は100文字以内で入力してください")
      .optional(),

    customFields: z.record(z.string(), z.any()).optional(),
  })
  .refine(
    (data) => {
      // 電話連絡希望の場合は電話番号必須
      if (
        (data.preferredContactMethod === "phone" ||
          data.preferredContactMethod === "both") &&
        !data.phoneNumber
      ) {
        return false;
      }
      return true;
    },
    {
      message: "電話での連絡をご希望の場合は電話番号を入力してください",
      path: ["phoneNumber"],
    }
  );

// 型エクスポート
export type ContactFormData = z.infer<typeof contactFormSchema>;

// 簡易お問い合わせスキーマ（最小限の項目）
export const simpleContactFormSchema = z.object({
  firstName: contactFormSchema.shape.firstName,
  lastName: contactFormSchema.shape.lastName,
  email: contactFormSchema.shape.email,
  subject: contactFormSchema.shape.subject,
  message: contactFormSchema.shape.message,
  privacyPolicyAccepted: contactFormSchema.shape.privacyPolicyAccepted,
});
export type SimpleContactFormData = z.infer<typeof simpleContactFormSchema>;

// 部分的なスキーマ（下書き保存用）
export const contactFormPartialSchema = contactFormSchema.partial({
  firstName: true,
  lastName: true,
  email: true,
  subject: true,
  message: true,
  contactType: true,
  privacyPolicyAccepted: true,
});
export type ContactFormPartialData = z.infer<typeof contactFormPartialSchema>;

// バリデーション関数
export const validateContactForm = (data: unknown) => {
  return contactFormSchema.safeParse(data);
};

export const validateSimpleContactForm = (data: unknown) => {
  return simpleContactFormSchema.safeParse(data);
};

// フィールド別スキーマ
export const contactFieldSchemas = {
  firstName: contactFormSchema.shape.firstName,
  lastName: contactFormSchema.shape.lastName,
  email: contactFormSchema.shape.email,
  phoneNumber: contactFormSchema.shape.phoneNumber,
  company: contactFormSchema.shape.company,
  jobTitle: contactFormSchema.shape.jobTitle,
  contactType: contactFormSchema.shape.contactType,
  subject: contactFormSchema.shape.subject,
  message: contactFormSchema.shape.message,
  priority: contactFormSchema.shape.priority,
  attachments: contactFormSchema.shape.attachments,
  systemInfo: contactFormSchema.shape.systemInfo,
  preferredContactMethod: contactFormSchema.shape.preferredContactMethod,
  bestTimeToContact: contactFormSchema.shape.bestTimeToContact,
  allowMarketingEmails: contactFormSchema.shape.allowMarketingEmails,
  subscribeToNewsletter: contactFormSchema.shape.subscribeToNewsletter,
  privacyPolicyAccepted: contactFormSchema.shape.privacyPolicyAccepted,
  source: contactFormSchema.shape.source,
  customFields: contactFormSchema.shape.customFields,
};
