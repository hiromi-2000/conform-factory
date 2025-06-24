import { describe, it, expect } from "vitest";
import {
  userRegistrationSchema,
  userRegistrationPartialSchema,
  validateUserRegistration,
  userFieldSchemas,
  type UserRegistrationData,
} from "../userSchema";

describe("userRegistrationSchema", () => {
  const validUserData: UserRegistrationData = {
    firstName: "太郎",
    lastName: "田中",
    email: "taro.tanaka@example.com",
    password: "Password123",
    confirmPassword: "Password123",
    age: 25,
    phoneNumber: "03-1234-5678",
    termsAccepted: true,
    newsletterSubscribed: false,
    preferredLanguage: "ja",
    interests: ["technology", "sports"],
  };

  describe("成功ケース", () => {
    it("有効なデータで成功する", () => {
      const result = userRegistrationSchema.safeParse(validUserData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("taro.tanaka@example.com");
        expect(result.data.preferredLanguage).toBe("ja");
        expect(result.data.newsletterSubscribed).toBe(false);
      }
    });

    it("最小限の必須データで成功する", () => {
      const minimalData = {
        firstName: "太郎",
        lastName: "田中",
        email: "taro@example.com",
        password: "Password123",
        confirmPassword: "Password123",
        termsAccepted: true,
      };
      const result = userRegistrationSchema.safeParse(minimalData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.preferredLanguage).toBe("ja"); // デフォルト値
        expect(result.data.newsletterSubscribed).toBe(false); // デフォルト値
      }
    });

    it("メールアドレスが小文字に変換される", () => {
      const dataWithUppercaseEmail = {
        ...validUserData,
        email: "TARO.TANAKA@EXAMPLE.COM",
      };
      const result = userRegistrationSchema.safeParse(dataWithUppercaseEmail);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("taro.tanaka@example.com");
      }
    });
  });

  describe("バリデーションエラー", () => {
    describe("firstName", () => {
      it("空文字でエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          firstName: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("名前を入力してください");
        }
      });

      it("50文字超過でエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          firstName: "a".repeat(51),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "名前は50文字以内で入力してください"
          );
        }
      });

      it("スペース含有でエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          firstName: "太郎 次郎",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "名前にスペースは含められません"
          );
        }
      });
    });

    describe("lastName", () => {
      it("空文字でエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          lastName: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("姓を入力してください");
        }
      });

      it("スペース含有でエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          lastName: "田中 佐藤",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "姓にスペースは含められません"
          );
        }
      });
    });

    describe("email", () => {
      it("無効なメールアドレスでエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          email: "invalid-email",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "有効なメールアドレスを入力してください"
          );
        }
      });
    });

    describe("password", () => {
      it("7文字以下でエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          password: "Pass123",
          confirmPassword: "Pass123",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "パスワードは8文字以上で入力してください"
          );
        }
      });

      it("100文字超過でエラー", () => {
        const longPassword = "P" + "a".repeat(99) + "1";
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          password: longPassword,
          confirmPassword: longPassword,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "パスワードは100文字以内で入力してください"
          );
        }
      });

      it("英大文字なしでエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          password: "password123",
          confirmPassword: "password123",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "パスワードは英大文字、小文字、数字を含む必要があります"
          );
        }
      });

      it("英小文字なしでエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          password: "PASSWORD123",
          confirmPassword: "PASSWORD123",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "パスワードは英大文字、小文字、数字を含む必要があります"
          );
        }
      });

      it("数字なしでエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          password: "Password",
          confirmPassword: "Password",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "パスワードは英大文字、小文字、数字を含む必要があります"
          );
        }
      });
    });

    describe("confirmPassword", () => {
      it("パスワードと一致しない場合エラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          password: "Password123",
          confirmPassword: "Password456",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          const confirmPasswordError = result.error.issues.find((issue) =>
            issue.path.includes("confirmPassword")
          );
          expect(confirmPasswordError?.message).toBe(
            "パスワードが一致しません"
          );
        }
      });
    });

    describe("age", () => {
      it("12歳以下でエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          age: 12,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "13歳以上である必要があります"
          );
        }
      });

      it("120歳超過でエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          age: 121,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "有効な年齢を入力してください"
          );
        }
      });

      it("小数でエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          age: 25.5,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "年齢は整数で入力してください"
          );
        }
      });
    });

    describe("phoneNumber", () => {
      it("無効な形式でエラー", () => {
        ["12345", "abc-defg-hijk"].forEach((phone) => {
          const result = userRegistrationSchema.safeParse({
            ...validUserData,
            phoneNumber: phone,
          });
          expect(result.success).toBe(false);
          if (!result.success) {
            expect(result.error.issues[0].message).toBe(
              "電話番号は正しい形式で入力してください（例：03-1234-5678、090-1234-5678）"
            );
          }
        });
      });

      it("有効な形式で成功", () => {
        [
          "03-1234-5678",
          "090-1234-5678",
          "080-1234-5678",
          "070-1234-5678",
        ].forEach((phone) => {
          const result = userRegistrationSchema.safeParse({
            ...validUserData,
            phoneNumber: phone,
          });
          expect(result.success).toBe(true);
        });
      });
    });

    describe("termsAccepted", () => {
      it("falseでエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          termsAccepted: false,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "利用規約に同意する必要があります"
          );
        }
      });
    });

    describe("preferredLanguage", () => {
      it("無効な言語でエラー", () => {
        const result = userRegistrationSchema.safeParse({
          ...validUserData,
          preferredLanguage: "fr" as any,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("言語を選択してください");
        }
      });
    });
  });
});

describe("userRegistrationPartialSchema", () => {
  it("部分的なデータで成功する", () => {
    const partialData = {
      firstName: "太郎",
      email: "taro@example.com",
    };
    const result = userRegistrationPartialSchema.safeParse(partialData);
    expect(result.success).toBe(true);
  });

  it("空のオブジェクトで成功する", () => {
    const result = userRegistrationPartialSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});

describe("validateUserRegistration", () => {
  it("有効なデータで成功を返す", () => {
    const validData: UserRegistrationData = {
      firstName: "太郎",
      lastName: "田中",
      email: "taro@example.com",
      password: "Password123",
      confirmPassword: "Password123",
      termsAccepted: true,
    };
    const result = validateUserRegistration(validData);
    expect(result.success).toBe(true);
  });

  it("無効なデータでエラーを返す", () => {
    const invalidData = {
      firstName: "",
      email: "invalid-email",
    };
    const result = validateUserRegistration(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("userFieldSchemas", () => {
  it("個別フィールドスキーマが正しく動作する", () => {
    expect(userFieldSchemas.firstName.safeParse("太郎").success).toBe(true);
    expect(userFieldSchemas.firstName.safeParse("").success).toBe(false);

    expect(userFieldSchemas.email.safeParse("test@example.com").success).toBe(
      true
    );
    expect(userFieldSchemas.email.safeParse("invalid-email").success).toBe(
      false
    );

    expect(userFieldSchemas.age.safeParse(25).success).toBe(true);
    expect(userFieldSchemas.age.safeParse(12).success).toBe(false);
  });
});
