import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { CheckboxField } from "./checkbox-field";
import { useTestForm, TestForm } from "./test-form-utilities";

const meta: Meta<typeof CheckboxField> = {
  component: CheckboxField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "汎用的なチェックボックスフィールドコンポーネント",
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
      checkboxInput: false,
      requiredCheckboxInput: false,
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
        <CheckboxField
          field={fields.checkboxInput}
          label="通常のチェックボックス"
        />
      )}
    </FormWrapper>
  ),
};

export const Required: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <CheckboxField
          field={fields.requiredCheckboxInput}
          label="必須のチェックボックス"
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
        <CheckboxField
          field={fields.checkboxInput}
          label="利用規約に同意する"
          description="サービス利用規約とプライバシーポリシーに同意してください"
        />
      )}
    </FormWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <CheckboxField
          field={fields.checkboxInput}
          label="無効なチェックボックス"
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
          <CheckboxField
            field={fields.checkboxInput}
            label="通常のチェックボックス"
          />
          <CheckboxField
            field={fields.requiredCheckboxInput}
            label="必須のチェックボックス"
            required
          />
          <CheckboxField
            field={fields.checkboxInput}
            label="利用規約に同意する"
            description="サービス利用規約とプライバシーポリシーに同意してください"
          />
          <CheckboxField
            field={fields.checkboxInput}
            label="無効なチェックボックス"
            isDisabled
          />
        </div>
      )}
    </FormWrapper>
  ),
};
