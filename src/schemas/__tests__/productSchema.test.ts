import { describe, it, expect } from "vitest";
import {
  productRegistrationSchema,
  productRegistrationPartialSchema,
  validateProductRegistration,
  productFieldSchemas,
  productCategories,
  productConditions,
  type ProductRegistrationData,
} from "../productSchema";

describe("productRegistrationSchema", () => {
  const validProductData: ProductRegistrationData = {
    name: "iPhone 15 Pro",
    description: "最新のApple iPhone 15 Pro、256GBモデル",
    price: 149800,
    originalPrice: 159800,
    currency: "JPY",
    category: "electronics",
    subcategory: "smartphones",
    brand: "Apple",
    model: "iPhone 15 Pro",
    condition: "new",
    quantity: 10,
    dimensions: {
      length: 146.6,
      width: 70.6,
      height: 8.25,
      unit: "cm",
    },
    weight: {
      value: 187,
      unit: "g",
    },
    images: [
      "https://example.com/iphone15pro-1.jpg",
      "https://example.com/iphone15pro-2.jpg",
    ],
    tags: ["smartphone", "apple", "5g"],
    isAvailable: true,
    isFeatured: false,
    allowBackorder: false,
    sku: "IPH15P-256-TBL",
    manufacturerPartNumber: "MTLX3J/A",
  };

  describe("成功ケース", () => {
    it("有効なデータで成功する", () => {
      const result = productRegistrationSchema.safeParse(validProductData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("iPhone 15 Pro");
        expect(result.data.currency).toBe("JPY");
        expect(result.data.condition).toBe("new");
      }
    });

    it("最小限の必須データで成功する", () => {
      const minimalData = {
        name: "テスト商品",
        description: "これはテスト用の商品です。",
        price: 1000,
        category: "other" as const,
        condition: "new" as const,
        images: ["https://example.com/test.jpg"],
      };
      const result = productRegistrationSchema.safeParse(minimalData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.currency).toBe("JPY"); // デフォルト値
        expect(result.data.quantity).toBe(1); // デフォルト値
      }
    });

    it("名前と説明がトリムされる", () => {
      const dataWithSpaces = {
        ...validProductData,
        name: "  iPhone 15 Pro  ",
        description: "  最新のApple iPhone 15 Pro  ",
      };
      const result = productRegistrationSchema.safeParse(dataWithSpaces);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("iPhone 15 Pro");
        expect(result.data.description).toBe("最新のApple iPhone 15 Pro");
      }
    });
  });

  describe("バリデーションエラー", () => {
    describe("name", () => {
      it("空文字でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          name: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "商品名を入力してください"
          );
        }
      });

      it("100文字超過でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          name: "a".repeat(101),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "商品名は100文字以内で入力してください"
          );
        }
      });
    });

    describe("description", () => {
      it("9文字以下でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          description: "短い説明",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "商品説明は10文字以上で入力してください"
          );
        }
      });

      it("1000文字超過でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          description: "a".repeat(1001),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "商品説明は1000文字以内で入力してください"
          );
        }
      });
    });

    describe("price", () => {
      it("負の値でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          price: -100,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "価格は正の数で入力してください"
          );
        }
      });

      it("1000万円超過でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          price: 10000001,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "価格は1000万円以下で入力してください"
          );
        }
      });

      it("小数点以下3桁でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          price: 100.123,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "価格は小数点以下2桁まで入力してください"
          );
        }
      });
    });

    describe("originalPrice", () => {
      it("販売価格が定価以上でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          price: 160000,
          originalPrice: 150000,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          const priceError = result.error.issues.find((issue) =>
            issue.path.includes("price")
          );
          expect(priceError?.message).toBe(
            "販売価格は定価より安く設定してください"
          );
        }
      });
    });

    describe("category", () => {
      it("無効なカテゴリでエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          category: "invalid-category",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "カテゴリを選択してください"
          );
        }
      });
    });

    describe("condition", () => {
      it("無効な商品状態でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          condition: "invalid-condition",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "商品状態を選択してください"
          );
        }
      });
    });

    describe("quantity", () => {
      it("負の値でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          quantity: -1,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "在庫数は0以上で入力してください"
          );
        }
      });

      it("小数でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          quantity: 10.5,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "在庫数は整数で入力してください"
          );
        }
      });
    });

    describe("weight", () => {
      it("負の値でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          weight: {
            value: -100,
            unit: "g",
          },
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "重量は正の数で入力してください"
          );
        }
      });
    });

    describe("dimensions", () => {
      it("負の寸法でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          dimensions: {
            length: -10,
            width: 5,
            height: 5,
            unit: "cm",
          },
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "長さは正の数で入力してください"
          );
        }
      });
    });

    describe("images", () => {
      it("空の配列でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          images: [],
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "最低1枚の画像が必要です"
          );
        }
      });

      it("10枚超過でエラー", () => {
        const manyImages = Array(11).fill("https://example.com/test.jpg");
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          images: manyImages,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "画像は最大10枚まで登録できます"
          );
        }
      });

      it("無効なURL形式でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          images: ["invalid-url"],
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "有効なURL形式で入力してください"
          );
        }
      });
    });

    describe("sku", () => {
      it("無効な文字でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          sku: "invalid-sku!",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "SKUは英大文字、数字、ハイフン、アンダースコアのみ使用できます"
          );
        }
      });

      it("50文字超過でエラー", () => {
        const result = productRegistrationSchema.safeParse({
          ...validProductData,
          sku: "A".repeat(51),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "SKUは50文字以内で入力してください"
          );
        }
      });
    });
  });

  describe("カテゴリと状態の定数", () => {
    it("productCategoriesが正しく定義されている", () => {
      expect(productCategories).toContain("electronics");
      expect(productCategories).toContain("clothing");
      expect(productCategories).toContain("other");
    });

    it("productConditionsが正しく定義されている", () => {
      expect(productConditions).toContain("new");
      expect(productConditions).toContain("like-new");
      expect(productConditions).toContain("good");
      expect(productConditions).toContain("fair");
      expect(productConditions).toContain("poor");
    });
  });

  describe("productRegistrationPartialSchema", () => {
    it("部分的なデータで成功する", () => {
      const partialData = {
        name: "部分的なデータ",
        price: 1000,
      };
      const result = productRegistrationPartialSchema.safeParse(partialData);
      expect(result.success).toBe(true);
    });

    it("空のオブジェクトで成功する", () => {
      const result = productRegistrationPartialSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });

  describe("validateProductRegistration", () => {
    it("有効なデータで成功を返す", () => {
      const validData = {
        name: "テスト商品",
        description: "これはテスト用の商品です。",
        price: 1000,
        category: "other" as const,
        condition: "new" as const,
        images: ["https://example.com/test.jpg"],
      };
      const result = validateProductRegistration(validData);
      expect(result.success).toBe(true);
    });

    it("無効なデータでエラーを返す", () => {
      const invalidData = {
        name: "",
        price: -100,
      };
      const result = validateProductRegistration(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("productFieldSchemas", () => {
    it("個別フィールドスキーマが正しく動作する", () => {
      expect(productFieldSchemas.name.safeParse("テスト商品").success).toBe(
        true
      );
      expect(productFieldSchemas.name.safeParse("").success).toBe(false);

      expect(productFieldSchemas.price.safeParse(1000).success).toBe(true);
      expect(productFieldSchemas.price.safeParse(-100).success).toBe(false);

      expect(productFieldSchemas.quantity.safeParse(10).success).toBe(true);
      expect(productFieldSchemas.quantity.safeParse(-1).success).toBe(false);
    });
  });
});
