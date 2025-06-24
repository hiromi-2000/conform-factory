import { z } from "zod/v4";

// ユーザー登録フォームスキーマ
export const userRegistrationSchema = z
  .object({
    // 基本情報
    firstName: z
      .string()
      .min(1, "名前を入力してください")
      .max(50, "名前は50文字以内で入力してください")
      .regex(/^[^\s]+$/, "名前にスペースは含められません"),

    lastName: z
      .string()
      .min(1, "姓を入力してください")
      .max(50, "姓は50文字以内で入力してください")
      .regex(/^[^\s]+$/, "姓にスペースは含められません"),

    email: z
      .email("有効なメールアドレスを入力してください")
      .toLowerCase()
      .transform((email) => email.trim()),

    // パスワード関連
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .max(100, "パスワードは100文字以内で入力してください")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "パスワードは英大文字、小文字、数字を含む必要があります"
      ),

    confirmPassword: z.string(),

    // プロフィール情報
    age: z
      .number()
      .int("年齢は整数で入力してください")
      .min(13, "13歳以上である必要があります")
      .max(120, "有効な年齢を入力してください")
      .optional(),

    phoneNumber: z
      .string()
      .regex(
        /^0\d{1,4}-\d{1,4}-\d{4}$|^0[789]0-\d{4}-\d{4}$/,
        "電話番号は正しい形式で入力してください（例：03-1234-5678、090-1234-5678）"
      )
      .optional(),

    // 同意関連
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, "利用規約に同意する必要があります"),

    newsletterSubscribed: z.boolean().default(false),

    // 選択項目
    preferredLanguage: z
      .enum(["ja", "en", "zh"], {
        message: "言語を選択してください",
      })
      .default("ja"),

    interests: z.array(z.string()).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

// 型エクスポート
export type UserRegistrationData = z.infer<typeof userRegistrationSchema>;

// 部分的なスキーマ（段階的入力用）
export const userRegistrationPartialSchema = userRegistrationSchema.partial();
export type UserRegistrationPartialData = z.infer<
  typeof userRegistrationPartialSchema
>;

// バリデーション関数
export const validateUserRegistration = (data: unknown) => {
  return userRegistrationSchema.safeParse(data);
};

// フィールド別バリデーション
export const userFieldSchemas = {
  firstName: userRegistrationSchema.shape.firstName,
  lastName: userRegistrationSchema.shape.lastName,
  email: userRegistrationSchema.shape.email,
  password: userRegistrationSchema.shape.password,
  confirmPassword: userRegistrationSchema.shape.confirmPassword,
  age: userRegistrationSchema.shape.age,
  phoneNumber: userRegistrationSchema.shape.phoneNumber,
  termsAccepted: userRegistrationSchema.shape.termsAccepted,
  newsletterSubscribed: userRegistrationSchema.shape.newsletterSubscribed,
  preferredLanguage: userRegistrationSchema.shape.preferredLanguage,
  interests: userRegistrationSchema.shape.interests,
};
