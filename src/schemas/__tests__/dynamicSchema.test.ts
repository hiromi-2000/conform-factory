import { describe, it, expect } from "vitest";
import {
  dynamicFieldSchema,
  dynamicFormConfigSchema,
  dynamicFormDataSchema,
  validationRuleSchema,
  fieldOptionSchema,
  conditionalRuleSchema,
  validateDynamicFormConfig,
  validateDynamicField,
  validateDynamicFormData,
  createFieldId,
  getFieldDefaultValue,
  fieldTypes,
  validationRuleTypes,
  type DynamicFieldConfig,
} from "../dynamicSchema";

describe("dynamicFieldSchema", () => {
  const validField: DynamicFieldConfig = {
    id: "firstName",
    name: "firstName",
    type: "text",
    label: "First Name",
    placeholder: "Enter your first name",
    helpText: "Please enter your first name",
    defaultValue: "",
    validations: [
      {
        type: "required",
        message: "First name is required",
      },
      {
        type: "minLength",
        value: 2,
        message: "First name must be at least 2 characters",
      },
    ],
    required: true,
    disabled: false,
    readonly: false,
    hidden: false,
    width: "full",
    order: 0,
    conditionalRules: [],
    customAttributes: {
      "data-test": "firstName-field",
    },
  };

  describe("成功ケース", () => {
    it("有効なフィールド設定で成功する", () => {
      const result = dynamicFieldSchema.safeParse(validField);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe("firstName");
        expect(result.data.type).toBe("text");
        expect(result.data.label).toBe("First Name");
      }
    });

    it("最小限の設定で成功する", () => {
      const minimalField = {
        id: "email",
        name: "email",
        type: "email",
        label: "Email",
      };
      const result = dynamicFieldSchema.safeParse(minimalField);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.required).toBe(false); // デフォルト値
        expect(result.data.width).toBe("full"); // デフォルト値
        expect(result.data.order).toBe(0); // デフォルト値
      }
    });

    it("selectフィールドでオプション付きで成功する", () => {
      const selectField = {
        id: "country",
        name: "country",
        type: "select",
        label: "Country",
        options: [
          {
            label: "Japan",
            value: "jp",
            disabled: false,
            selected: true,
          },
          {
            label: "United States",
            value: "us",
            disabled: false,
            selected: false,
          },
        ],
      };
      const result = dynamicFieldSchema.safeParse(selectField);
      expect(result.success).toBe(true);
    });
  });

  describe("バリデーションエラー", () => {
    describe("id", () => {
      it("空文字でエラー", () => {
        const result = dynamicFieldSchema.safeParse({
          ...validField,
          id: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フィールドIDを入力してください"
          );
        }
      });

      it("無効な文字でエラー", () => {
        const result = dynamicFieldSchema.safeParse({
          ...validField,
          id: "123invalid",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フィールドIDは英字から始まり、英数字、アンダースコア、ハイフンのみ使用できます"
          );
        }
      });
    });

    describe("name", () => {
      it("空文字でエラー", () => {
        const result = dynamicFieldSchema.safeParse({
          ...validField,
          name: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フィールド名を入力してください"
          );
        }
      });

      it("100文字超過でエラー", () => {
        const result = dynamicFieldSchema.safeParse({
          ...validField,
          name: "a".repeat(101),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フィールド名は100文字以内で入力してください"
          );
        }
      });
    });

    describe("type", () => {
      it("無効なタイプでエラー", () => {
        const result = dynamicFieldSchema.safeParse({
          ...validField,
          type: "invalid-type",
        });
        expect(result.success).toBe(false);
        // Zodのデフォルトエラーメッセージを期待
      });
    });

    describe("label", () => {
      it("空文字でエラー", () => {
        const result = dynamicFieldSchema.safeParse({
          ...validField,
          label: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "ラベルを入力してください"
          );
        }
      });

      it("200文字超過でエラー", () => {
        const result = dynamicFieldSchema.safeParse({
          ...validField,
          label: "a".repeat(201),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "ラベルは200文字以内で入力してください"
          );
        }
      });
    });

    describe("placeholder", () => {
      it("200文字超過でエラー", () => {
        const result = dynamicFieldSchema.safeParse({
          ...validField,
          placeholder: "a".repeat(201),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "プレースホルダーは200文字以内で入力してください"
          );
        }
      });
    });

    describe("helpText", () => {
      it("500文字超過でエラー", () => {
        const result = dynamicFieldSchema.safeParse({
          ...validField,
          helpText: "a".repeat(501),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "ヘルプテキストは500文字以内で入力してください"
          );
        }
      });
    });
  });
});

describe("dynamicFormConfigSchema", () => {
  const validFormConfig = {
    id: "userRegistration",
    name: "userRegistration",
    title: "User Registration Form",
    description: "A form for user registration",
    fields: [
      {
        id: "firstName",
        name: "firstName",
        type: "text",
        label: "First Name",
        required: true,
        validations: [
          {
            type: "required",
            message: "First name is required",
          },
        ],
        width: "half",
        order: 1,
        conditionalRules: [],
      },
      {
        id: "lastName",
        name: "lastName",
        type: "text",
        label: "Last Name",
        required: true,
        validations: [
          {
            type: "required",
            message: "Last name is required",
          },
        ],
        width: "half",
        order: 2,
        conditionalRules: [],
      },
      {
        id: "email",
        name: "email",
        type: "email",
        label: "Email",
        required: true,
        validations: [
          {
            type: "required",
            message: "Email is required",
          },
          {
            type: "email",
            message: "Please enter a valid email address",
          },
        ],
        width: "full",
        order: 3,
        conditionalRules: [],
      },
    ],
  };

  describe("成功ケース", () => {
    it("有効なフォーム設定で成功する", () => {
      const result = dynamicFormConfigSchema.safeParse(validFormConfig);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe("userRegistration");
        expect(result.data.title).toBe("User Registration Form");
        expect(result.data.fields).toHaveLength(3);
      }
    });

    it("最小限の設定で成功する", () => {
      const minimalConfig = {
        id: "simpleForm",
        name: "simpleForm",
        title: "Simple Form",
        fields: [
          {
            id: "name",
            name: "name",
            type: "text",
            label: "Name",
          },
        ],
      };
      const result = dynamicFormConfigSchema.safeParse(minimalConfig);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.settings).toBeDefined();
      }
    });
  });

  describe("バリデーションエラー", () => {
    describe("id", () => {
      it("空文字でエラー", () => {
        const result = dynamicFormConfigSchema.safeParse({
          ...validFormConfig,
          id: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フォームIDを入力してください"
          );
        }
      });

      it("無効な文字でエラー", () => {
        const result = dynamicFormConfigSchema.safeParse({
          ...validFormConfig,
          id: "123invalid",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フォームIDは英字から始まり、英数字、アンダースコア、ハイフンのみ使用できます"
          );
        }
      });
    });

    describe("name", () => {
      it("空文字でエラー", () => {
        const result = dynamicFormConfigSchema.safeParse({
          ...validFormConfig,
          name: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フォーム名を入力してください"
          );
        }
      });

      it("200文字超過でエラー", () => {
        const result = dynamicFormConfigSchema.safeParse({
          ...validFormConfig,
          name: "a".repeat(201),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フォーム名は200文字以内で入力してください"
          );
        }
      });
    });

    describe("title", () => {
      it("空文字でエラー", () => {
        const result = dynamicFormConfigSchema.safeParse({
          ...validFormConfig,
          title: "",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フォームタイトルを入力してください"
          );
        }
      });

      it("200文字超過でエラー", () => {
        const result = dynamicFormConfigSchema.safeParse({
          ...validFormConfig,
          title: "a".repeat(201),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フォームタイトルは200文字以内で入力してください"
          );
        }
      });
    });

    describe("description", () => {
      it("1000文字超過でエラー", () => {
        const result = dynamicFormConfigSchema.safeParse({
          ...validFormConfig,
          description: "a".repeat(1001),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フォーム説明は1000文字以内で入力してください"
          );
        }
      });
    });

    describe("fields", () => {
      it("空配列でエラー", () => {
        const result = dynamicFormConfigSchema.safeParse({
          ...validFormConfig,
          fields: [],
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "最低1つのフィールドが必要です"
          );
        }
      });

      it("100フィールド超過でエラー", () => {
        const manyFields = Array(101)
          .fill(null)
          .map((_, i) => ({
            id: `field${i}`,
            name: `field${i}`,
            type: "text",
            label: `Field ${i}`,
          }));
        const result = dynamicFormConfigSchema.safeParse({
          ...validFormConfig,
          fields: manyFields,
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "フィールドは最大100個まで設定できます"
          );
        }
      });
    });
  });
});

describe("validationRuleSchema", () => {
  it("有効なバリデーションルールで成功する", () => {
    const validRule = {
      type: "required",
      message: "This field is required",
    };
    const result = validationRuleSchema.safeParse(validRule);
    expect(result.success).toBe(true);
  });

  it("値付きバリデーションルールで成功する", () => {
    const validRule = {
      type: "minLength",
      value: 5,
      message: "Minimum length is 5 characters",
    };
    const result = validationRuleSchema.safeParse(validRule);
    expect(result.success).toBe(true);
  });

  it("無効なタイプでエラー", () => {
    const invalidRule = {
      type: "invalid-type",
      message: "Error message",
    };
    const result = validationRuleSchema.safeParse(invalidRule);
    expect(result.success).toBe(false);
  });
});

describe("fieldOptionSchema", () => {
  it("有効なオプションで成功する", () => {
    const validOption = {
      label: "Option 1",
      value: "option1",
      disabled: false,
      selected: true,
    };
    const result = fieldOptionSchema.safeParse(validOption);
    expect(result.success).toBe(true);
  });

  it("空ラベルでエラー", () => {
    const invalidOption = {
      label: "",
      value: "option1",
    };
    const result = fieldOptionSchema.safeParse(invalidOption);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("ラベルを入力してください");
    }
  });
});

describe("conditionalRuleSchema", () => {
  it("有効な条件付きルールで成功する", () => {
    const validRule = {
      dependsOn: "country",
      condition: "equals",
      value: "jp",
      action: "show",
    };
    const result = conditionalRuleSchema.safeParse(validRule);
    expect(result.success).toBe(true);
  });

  it("空の依存フィールドでエラー", () => {
    const invalidRule = {
      dependsOn: "",
      condition: "equals",
      value: "jp",
      action: "show",
    };
    const result = conditionalRuleSchema.safeParse(invalidRule);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "依存フィールドを指定してください"
      );
    }
  });
});

describe("dynamicFormDataSchema", () => {
  it("有効なフォームデータで成功する", () => {
    const validData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      age: 30,
      country: "jp",
      newsletter: true,
    };
    const result = dynamicFormDataSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("空のオブジェクトで成功する", () => {
    const result = dynamicFormDataSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});

describe("バリデーション関数", () => {
  describe("validateDynamicFormConfig", () => {
    it("有効なデータで成功を返す", () => {
      const validConfig = {
        id: "testForm",
        name: "testForm",
        title: "Test Form",
        fields: [
          {
            id: "name",
            name: "name",
            type: "text",
            label: "Name",
          },
        ],
      };
      const result = validateDynamicFormConfig(validConfig);
      expect(result.success).toBe(true);
    });

    it("無効なデータでエラーを返す", () => {
      const invalidConfig = {
        id: "",
        name: "",
        title: "",
        fields: [],
      };
      const result = validateDynamicFormConfig(invalidConfig);
      expect(result.success).toBe(false);
    });
  });

  describe("validateDynamicField", () => {
    it("有効なデータで成功を返す", () => {
      const validField = {
        id: "email",
        name: "email",
        type: "email",
        label: "Email",
      };
      const result = validateDynamicField(validField);
      expect(result.success).toBe(true);
    });

    it("無効なデータでエラーを返す", () => {
      const invalidField = {
        id: "",
        name: "",
        type: "invalid",
        label: "",
      };
      const result = validateDynamicField(invalidField);
      expect(result.success).toBe(false);
    });
  });

  describe("validateDynamicFormData", () => {
    it("有効なデータで成功を返す", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
      };
      const result = validateDynamicFormData(validData);
      expect(result.success).toBe(true);
    });
  });
});

describe("ユーティリティ関数", () => {
  describe("createFieldId", () => {
    it("ラベルから有効なフィールドIDを生成する", () => {
      expect(createFieldId("First Name")).toBe("first_name");
      expect(createFieldId("Email Address")).toBe("email_address");
      expect(createFieldId("Phone Number (Mobile)")).toBe(
        "phone_number_mobile"
      );
      expect(createFieldId("お名前")).toBe(""); // 英数字以外は除去される
    });

    it("空文字列でデフォルトIDを生成する", () => {
      expect(createFieldId("")).toBe("");
    });
  });

  describe("getFieldDefaultValue", () => {
    it("フィールドタイプに基づいてデフォルト値を返す", () => {
      const textField = {
        id: "text",
        name: "text",
        type: "text" as const,
        label: "Text",
      };
      expect(getFieldDefaultValue(textField)).toBe("");

      const numberField = {
        id: "number",
        name: "number",
        type: "number" as const,
        label: "Number",
      };
      expect(getFieldDefaultValue(numberField)).toBe(0);

      const checkboxField = {
        id: "checkbox",
        name: "checkbox",
        type: "checkbox" as const,
        label: "Checkbox",
      };
      expect(getFieldDefaultValue(checkboxField)).toBe(false);
    });

    it("デフォルト値が指定されている場合はそれを返す", () => {
      const fieldWithDefault = {
        id: "withDefault",
        name: "withDefault",
        type: "text" as const,
        label: "With Default",
        defaultValue: "custom default",
      };
      expect(getFieldDefaultValue(fieldWithDefault)).toBe("custom default");
    });
  });
});

describe("定数", () => {
  describe("fieldTypes", () => {
    it("すべてのフィールドタイプを含む", () => {
      expect(fieldTypes).toContain("text");
      expect(fieldTypes).toContain("email");
      expect(fieldTypes).toContain("password");
      expect(fieldTypes).toContain("number");
      expect(fieldTypes).toContain("select");
      expect(fieldTypes).toContain("checkbox");
      expect(fieldTypes).toContain("radio");
      expect(fieldTypes).toContain("file");
      expect(fieldTypes).toContain("date");
      expect(fieldTypes).toContain("textarea");
    });
  });

  describe("validationRuleTypes", () => {
    it("すべてのバリデーションルールタイプを含む", () => {
      expect(validationRuleTypes).toContain("required");
      expect(validationRuleTypes).toContain("minLength");
      expect(validationRuleTypes).toContain("maxLength");
      expect(validationRuleTypes).toContain("min");
      expect(validationRuleTypes).toContain("max");
      expect(validationRuleTypes).toContain("pattern");
      expect(validationRuleTypes).toContain("email");
      expect(validationRuleTypes).toContain("url");
      expect(validationRuleTypes).toContain("custom");
    });
  });
});
