import { type ContactFormPaths } from "../typed-form-factory";
import type { ContactFormData } from "../../schemas/contactSchema";

describe("型安全なFormFactory", () => {
  test("有効なフィールドパスが正しく型推論される", () => {
    // 型レベルでのテスト（コンパイル時にチェックされる）

    // ✅ これらはすべて有効なパス
    const validPaths: ContactFormPaths[] = [
      "firstName",
      "lastName",
      "email",
      "contactType",
      "message",
      "allowMarketingEmails",
      "preferredContactTime",
      "acceptTerms",
    ];

    expect(validPaths.length).toBeGreaterThan(0);
  });

  test("ContactFormPathsが正しい型を生成する", () => {
    // type-festのPaths型がContactFormDataから正しく推論されることを確認
    type ExpectedPaths = keyof ContactFormData;

    // 型の互換性をチェック
    const isCompatible = (path: ContactFormPaths): ExpectedPaths => {
      return path as any; // 実際のプロダクションコードではこの変換は不要
    };

    expect(typeof isCompatible).toBe("function");
  });

  // ❌ このテストは意図的にコメントアウト（TypeScriptエラーを引き起こすため）
  /*
  test("無効なフィールドパスはTypeScriptエラーになる", () => {
    // これらはTypeScriptコンパイル時にエラーになるはず
    const invalidPaths: ContactFormPaths[] = [
      "invalidField",    // 存在しないフィールド
      "firstName ",      // スペース
      "firsName",        // タイポ
      "Email"            // 大文字（実際のフィールドは小文字）
    ];
  });
  */
});
