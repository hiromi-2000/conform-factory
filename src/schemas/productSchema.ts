import { z } from "zod/v4";

// 商品カテゴリ定義
export const productCategories = [
  "electronics",
  "clothing",
  "books",
  "home",
  "sports",
  "toys",
  "beauty",
  "automotive",
  "food",
  "other",
] as const;

// 商品状態定義
export const productConditions = [
  "new",
  "like-new",
  "good",
  "fair",
  "poor",
] as const;

// 商品登録フォームスキーマ
export const productRegistrationSchema = z
  .object({
    // Intent - Conform intent button用
    intent: z.enum(["submit", "draft"]).optional(),

    // 基本情報
    name: z
      .string()
      .min(1, "商品名を入力してください")
      .max(100, "商品名は100文字以内で入力してください")
      .transform((name) => name.trim()),

    description: z
      .string()
      .min(10, "商品説明は10文字以上で入力してください")
      .max(1000, "商品説明は1000文字以内で入力してください")
      .transform((desc) => desc.trim()),

    // 価格情報
    price: z
      .number()
      .positive("価格は正の数で入力してください")
      .max(10000000, "価格は1000万円以下で入力してください")
      .multipleOf(0.01, "価格は小数点以下2桁まで入力してください"),

    originalPrice: z
      .number()
      .positive("定価は正の数で入力してください")
      .max(10000000, "定価は1000万円以下で入力してください")
      .multipleOf(0.01, "定価は小数点以下2桁まで入力してください")
      .optional(),

    currency: z
      .enum(["JPY", "USD", "EUR"], {
        message: "通貨を選択してください",
      })
      .default("JPY"),

    // カテゴリ・分類
    category: z.enum(productCategories, {
      message: "カテゴリを選択してください",
    }),

    subcategory: z.string().optional(),

    brand: z
      .string()
      .max(50, "ブランド名は50文字以内で入力してください")
      .optional(),

    model: z
      .string()
      .max(50, "モデル名は50文字以内で入力してください")
      .optional(),

    // 商品状態・在庫
    condition: z.enum(productConditions, {
      message: "商品状態を選択してください",
    }),

    quantity: z
      .number()
      .int("在庫数は整数で入力してください")
      .min(0, "在庫数は0以上で入力してください")
      .max(99999, "在庫数は99999以下で入力してください")
      .default(1),

    // 寸法・重量
    dimensions: z
      .object({
        length: z
          .number()
          .positive("長さは正の数で入力してください")
          .optional(),
        width: z.number().positive("幅は正の数で入力してください").optional(),
        height: z
          .number()
          .positive("高さは正の数で入力してください")
          .optional(),
        unit: z
          .enum(["cm", "inch", "m"], {
            message: "単位を選択してください",
          })
          .default("cm"),
      })
      .optional(),

    weight: z
      .object({
        value: z.number().positive("重量は正の数で入力してください"),
        unit: z
          .enum(["g", "kg", "lb"], {
            message: "重量単位を選択してください",
          })
          .default("g"),
      })
      .optional(),

    // 画像・メディア
    images: z
      .array(z.string().url("有効なURL形式で入力してください"))
      .min(1, "最低1枚の画像が必要です")
      .max(10, "画像は最大10枚まで登録できます"),

    // タグ・キーワード
    tags: z
      .array(z.string().max(20, "タグは20文字以内で入力してください"))
      .max(10, "タグは最大10個まで設定できます")
      .optional(),

    // 販売設定
    isAvailable: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
    allowBackorder: z.boolean().default(false),

    // メタデータ
    sku: z
      .string()
      .regex(
        /^[A-Z0-9-_]+$/,
        "SKUは英大文字、数字、ハイフン、アンダースコアのみ使用できます"
      )
      .max(50, "SKUは50文字以内で入力してください")
      .optional(),

    manufacturerPartNumber: z
      .string()
      .max(50, "製造元品番は50文字以内で入力してください")
      .optional(),
  })
  .refine(
    (data) => {
      // 割引価格が定価より安いかチェック
      if (data.originalPrice && data.price >= data.originalPrice) {
        return false;
      }
      return true;
    },
    {
      message: "販売価格は定価より安く設定してください",
      path: ["price"],
    }
  );

// 型エクスポート
export type ProductRegistrationData = z.infer<typeof productRegistrationSchema>;

// 部分的なスキーマ（下書き保存用）
export const productRegistrationPartialSchema =
  productRegistrationSchema.partial({
    name: true,
    description: true,
    price: true,
    category: true,
    condition: true,
    images: true,
  });
export type ProductRegistrationPartialData = z.infer<
  typeof productRegistrationPartialSchema
>;

// バリデーション関数
export const validateProductRegistration = (data: unknown) => {
  return productRegistrationSchema.safeParse(data);
};

// フィールド別スキーマ
export const productFieldSchemas = {
  name: productRegistrationSchema.shape.name,
  description: productRegistrationSchema.shape.description,
  price: productRegistrationSchema.shape.price,
  originalPrice: productRegistrationSchema.shape.originalPrice,
  currency: productRegistrationSchema.shape.currency,
  category: productRegistrationSchema.shape.category,
  subcategory: productRegistrationSchema.shape.subcategory,
  brand: productRegistrationSchema.shape.brand,
  model: productRegistrationSchema.shape.model,
  condition: productRegistrationSchema.shape.condition,
  quantity: productRegistrationSchema.shape.quantity,
  dimensions: productRegistrationSchema.shape.dimensions,
  weight: productRegistrationSchema.shape.weight,
  images: productRegistrationSchema.shape.images,
  tags: productRegistrationSchema.shape.tags,
  isAvailable: productRegistrationSchema.shape.isAvailable,
  isFeatured: productRegistrationSchema.shape.isFeatured,
  allowBackorder: productRegistrationSchema.shape.allowBackorder,
  sku: productRegistrationSchema.shape.sku,
  manufacturerPartNumber:
    productRegistrationSchema.shape.manufacturerPartNumber,
};
