import { describe, it, expect } from "vitest";
import {
  contactFormSchema,
  simpleContactFormSchema,
  contactFormPartialSchema,
  validateContactForm,
  validateSimpleContactForm,
  contactFieldSchemas,
  contactTypes,
  priorityLevels,
  type ContactFormData,
} from "../contactSchema";

describe("contactFormSchema", () => {
  const validContactData: ContactFormData = {
    firstName: "太郎",
    lastName: "田中",
    email: "taro.tanaka@example.com",
    phoneNumber: "03-1234-5678",
    company: "株式会社テスト",
    jobTitle: "エンジニア",
    contactType: "technical",
    subject: "技術的な質問があります",
    message: "React Conformについて詳しく教えてください。",
    priority: "normal",
    preferredContactMethod: "email",
    bestTimeToContact: "平日 9:00-18:00",
    allowMarketingEmails: false,
    subscribeToNewsletter: false,
    privacyPolicyAccepted: true,
    source: "Google検索",
  };

  describe("成功ケース", () => {
    it("有効なデータで成功する", () => {
      const result = contactFormSchema.safeParse(validContactData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("taro.tanaka@example.com");
        expect(result.data.priority).toBe("normal");
        expect(result.data.preferredContactMethod).toBe("email");
      }
    });

    it("最小限の必須データで成功する", () => {
      const minimalData = {
        firstName: "太郎",
        lastName: "田中",
        email: "taro@example.com",
        contactType: "general" as const,
        subject: "お問い合わせ",
        message: "テストメッセージです。",
        privacyPolicyAccepted: true,
      };
      const result = contactFormSchema.safeParse(minimalData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.priority).toBe("normal"); // デフォルト値
        expect(result.data.preferredContactMethod).toBe("email"); // デフォルト値
      }
    });

    it("文字列がトリムされる", () => {
      const dataWithSpaces = {
        ...validContactData,
        firstName: "  太郎  ",
        lastName: "  田中  ",
        subject: "  テスト件名  ",
        message: "  テストメッセージ  ",
      };
      const result = contactFormSchema.safeParse(dataWithSpaces);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.firstName).toBe("太郎");
        expect(result.data.lastName).toBe("田中");
        expect(result.data.subject).toBe("テスト件名");
        expect(result.data.message).toBe("テストメッセージ");
      }
    });
  });

  describe("バリデーションエラー", () => {
    describe("firstName", () => {
      it("空文字でエラー", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          firstName: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("名前を入力してください");
        }
      });

      it("50文字超過でエラー", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          firstName: "a".repeat(51),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "名前は50文字以内で入力してください"
          );
        }
      });
    });

    describe("email", () => {
      it("無効なメールアドレスでエラー", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
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

    describe("phoneNumber", () => {
      it("無効な形式でエラー", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          phoneNumber: "12345", // 無効な形式
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "電話番号は正しい形式で入力してください（例：03-1234-5678、090-1234-5678）"
          );
        }
      });

      it("携帯電話番号で成功", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          phoneNumber: "090-1234-5678",
        });
        expect(result.success).toBe(true);
      });
    });

    describe("subject", () => {
      it("空文字でエラー", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          subject: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("件名を入力してください");
        }
      });

      it("200文字超過でエラー", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          subject: "a".repeat(201),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "件名は200文字以内で入力してください"
          );
        }
      });
    });

    describe("message", () => {
      it("9文字以下でエラー", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          message: "短い",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "お問い合わせ内容は10文字以上で入力してください"
          );
        }
      });

      it("2000文字超過でエラー", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          message: "a".repeat(2001),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "お問い合わせ内容は2000文字以内で入力してください"
          );
        }
      });
    });

    describe("privacyPolicyAccepted", () => {
      it("falseでエラー", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          privacyPolicyAccepted: false,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "プライバシーポリシーに同意する必要があります"
          );
        }
      });
    });

    describe("電話連絡希望時の電話番号必須バリデーション", () => {
      it("電話連絡希望で電話番号なしでエラー", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          phoneNumber: undefined,
          preferredContactMethod: "phone",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          const phoneError = result.error.issues.find((issue) =>
            issue.path.includes("phoneNumber")
          );
          expect(phoneError?.message).toBe(
            "電話での連絡をご希望の場合は電話番号を入力してください"
          );
        }
      });

      it("両方連絡希望で電話番号なしでエラー", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          phoneNumber: undefined,
          preferredContactMethod: "both",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          const phoneError = result.error.issues.find((issue) =>
            issue.path.includes("phoneNumber")
          );
          expect(phoneError?.message).toBe(
            "電話での連絡をご希望の場合は電話番号を入力してください"
          );
        }
      });

      it("メール連絡のみで電話番号なしで成功", () => {
        const result = contactFormSchema.safeParse({
          ...validContactData,
          phoneNumber: undefined,
          preferredContactMethod: "email",
        });
        expect(result.success).toBe(true);
      });
    });
  });
});

describe("simpleContactFormSchema", () => {
  it("簡易フォームデータで成功する", () => {
    const simpleData = {
      firstName: "太郎",
      lastName: "田中",
      email: "taro@example.com",
      subject: "お問い合わせ",
      message: "テストメッセージです。",
      privacyPolicyAccepted: true,
    };
    const result = simpleContactFormSchema.safeParse(simpleData);
    expect(result.success).toBe(true);
  });
});

describe("contactFormPartialSchema", () => {
  it("部分的なデータで成功する", () => {
    const partialData = {
      firstName: "太郎",
      email: "taro@example.com",
    };
    const result = contactFormPartialSchema.safeParse(partialData);
    expect(result.success).toBe(true);
  });
});

describe("バリデーション関数", () => {
  it("validateContactFormが正しく動作する", () => {
    const validData = {
      firstName: "太郎",
      lastName: "田中",
      email: "taro@example.com",
      contactType: "general" as const,
      subject: "テスト",
      message: "テストメッセージです。",
      privacyPolicyAccepted: true,
    };
    const result = validateContactForm(validData);
    expect(result.success).toBe(true);
  });

  it("validateSimpleContactFormが正しく動作する", () => {
    const validData = {
      firstName: "太郎",
      lastName: "田中",
      email: "taro@example.com",
      subject: "テスト",
      message: "テストメッセージです。",
      privacyPolicyAccepted: true,
    };
    const result = validateSimpleContactForm(validData);
    expect(result.success).toBe(true);
  });
});

describe("定数と個別フィールドスキーマ", () => {
  it("contactTypesが正しく定義されている", () => {
    expect(contactTypes).toContain("general");
    expect(contactTypes).toContain("technical");
    expect(contactTypes).toContain("support");
  });

  it("priorityLevelsが正しく定義されている", () => {
    expect(priorityLevels).toContain("low");
    expect(priorityLevels).toContain("normal");
    expect(priorityLevels).toContain("high");
    expect(priorityLevels).toContain("urgent");
  });

  it("個別フィールドスキーマが正しく動作する", () => {
    expect(contactFieldSchemas.firstName.safeParse("太郎").success).toBe(true);
    expect(contactFieldSchemas.firstName.safeParse("").success).toBe(false);

    expect(
      contactFieldSchemas.email.safeParse("test@example.com").success
    ).toBe(true);
    expect(contactFieldSchemas.email.safeParse("invalid-email").success).toBe(
      false
    );
  });
});
