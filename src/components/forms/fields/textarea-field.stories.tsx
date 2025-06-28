import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { TextareaField } from "./textarea-field";
import { useTestForm, TestForm } from "./test-form-utilities";

const meta: Meta<typeof TextareaField> = {
  component: TextareaField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "汎用的なテキストエリアフィールドコンポーネント",
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
      textareaInput: "",
      requiredTextareaInput: "",
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
        <TextareaField
          field={fields.textareaInput}
          label="通常のテキストエリア"
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
        <TextareaField
          field={fields.requiredTextareaInput}
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
        <TextareaField
          field={fields.textareaInput}
          label="コメント"
          placeholder="コメントを入力"
          description="詳細なコメントを入力してください"
        />
      )}
    </FormWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <TextareaField
          field={fields.textareaInput}
          label="無効なテキストエリア"
          placeholder="無効なテキストエリア"
          isDisabled
        />
      )}
    </FormWrapper>
  ),
};

export const LargeTextarea: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <TextareaField
          field={fields.textareaInput}
          label="大きなテキストエリア"
          placeholder="大きなテキストエリア"
          rows={8}
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
          <TextareaField
            field={fields.textareaInput}
            label="通常のテキストエリア"
            placeholder="テキストを入力してください"
          />
          <TextareaField
            field={fields.requiredTextareaInput}
            label="必須項目"
            placeholder="必須項目です"
            required
          />
          <TextareaField
            field={fields.textareaInput}
            label="説明付き"
            placeholder="コメントを入力"
            description="詳細なコメントを入力してください"
          />
          <TextareaField
            field={fields.textareaInput}
            label="大きなテキストエリア"
            placeholder="大きなテキストエリア"
            rows={8}
          />
          <TextareaField
            field={fields.textareaInput}
            label="無効なテキストエリア"
            placeholder="無効なテキストエリア"
            isDisabled
          />
        </div>
      )}
    </FormWrapper>
  ),
};
