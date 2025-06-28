import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { SelectField } from "./select-field";
import { useTestForm, TestForm } from "./test-form-utilities";

const mockOptions = [
  { value: "option1", label: "オプション1" },
  { value: "option2", label: "オプション2" },
  { value: "option3", label: "オプション3" },
  { value: "option4", label: "オプション4" },
];

const meta: Meta<typeof SelectField> = {
  component: SelectField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "汎用的な選択フィールドコンポーネント",
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
      selectInput: "",
      requiredSelectInput: "",
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
        <SelectField
          field={fields.selectInput}
          label="通常の選択"
          placeholder="選択してください"
          options={mockOptions}
        />
      )}
    </FormWrapper>
  ),
};

export const Required: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <SelectField
          field={fields.requiredSelectInput}
          label="必須項目"
          placeholder="必須選択"
          options={mockOptions}
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
        <SelectField
          field={fields.selectInput}
          label="カテゴリ選択"
          placeholder="カテゴリを選択"
          description="適切なカテゴリを選択してください"
          options={mockOptions}
        />
      )}
    </FormWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <SelectField
          field={fields.selectInput}
          label="無効な選択"
          placeholder="無効な選択"
          options={mockOptions}
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
          <SelectField
            field={fields.selectInput}
            label="通常の選択"
            placeholder="選択してください"
            options={mockOptions}
          />
          <SelectField
            field={fields.requiredSelectInput}
            label="必須項目"
            placeholder="必須選択"
            options={mockOptions}
            required
          />
          <SelectField
            field={fields.selectInput}
            label="説明付き"
            placeholder="カテゴリを選択"
            description="適切なカテゴリを選択してください"
            options={mockOptions}
          />
          <SelectField
            field={fields.selectInput}
            label="無効な選択"
            placeholder="無効な選択"
            options={mockOptions}
            isDisabled
          />
        </div>
      )}
    </FormWrapper>
  ),
};
