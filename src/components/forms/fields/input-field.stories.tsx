import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { InputField } from "./input-field";
import { useTestForm, TestForm } from "./test-form-utilities";

const meta: Meta<typeof InputField> = {
  component: InputField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "汎用的な入力フィールドコンポーネント",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const FormWrapper = ({
  children,
}: {
  children: (fields: any) => React.ReactNode;
}) => {
  const [form, fields] = useTestForm({
    defaultValue: {
      textInput: "",
      requiredTextInput: "",
      emailInput: "test@example.com",
    },
  });

  return (
    <TestForm form={form} className="space-y-6">
      {children(fields)}
    </TestForm>
  );
};

export const Default: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <InputField
          field={fields.textInput}
          label="通常の入力"
          placeholder="テキストを入力してください"
        />
      )}
    </FormWrapper>
  ),
};

export const Required: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <InputField
          field={fields.requiredTextInput}
          label="必須項目"
          placeholder="必須項目です"
          required
        />
      )}
    </FormWrapper>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <InputField
          field={fields.emailInput}
          label="メールアドレス"
          placeholder="メールアドレス"
          description="有効なメールアドレスを入力してください"
        />
      )}
    </FormWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <InputField
          field={fields.textInput}
          label="無効な入力"
          placeholder="無効な入力"
          isDisabled
        />
      )}
    </FormWrapper>
  ),
};

export const AllStates: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <div className="space-y-6">
          <InputField
            field={fields.textInput}
            label="通常の入力"
            placeholder="テキストを入力してください"
          />
          <InputField
            field={fields.requiredTextInput}
            label="必須項目"
            placeholder="必須項目です"
            required
          />
          <InputField
            field={fields.emailInput}
            label="メールアドレス"
            placeholder="メールアドレス"
            description="有効なメールアドレスを入力してください"
          />
          <InputField
            field={fields.textInput}
            label="無効な入力"
            placeholder="無効な入力"
            isDisabled
          />
        </div>
      )}
    </FormWrapper>
  ),
};
