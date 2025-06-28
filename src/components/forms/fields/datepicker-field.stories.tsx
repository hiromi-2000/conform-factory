import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DatePickerField } from "./datepicker-field";
import { useTestForm, TestForm } from "./test-form-utilities";

const meta: Meta<typeof DatePickerField> = {
  component: DatePickerField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "汎用的な日付選択フィールドコンポーネント",
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
      dateInput: "",
      requiredDateInput: "",
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
        <DatePickerField field={fields.dateInput} label="通常の日付選択" />
      )}
    </FormWrapper>
  ),
};

export const Required: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <DatePickerField
          field={fields.requiredDateInput}
          label="必須の日付"
          required
        />
      )}
    </FormWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormWrapper>
      {(fields: any) => (
        <DatePickerField
          field={fields.dateInput}
          label="無効な日付選択"
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
          <DatePickerField field={fields.dateInput} label="通常の日付選択" />
          <DatePickerField
            field={fields.requiredDateInput}
            label="必須の日付"
            required
          />
          <DatePickerField
            field={fields.dateInput}
            label="無効な日付選択"
            isDisabled
          />
        </div>
      )}
    </FormWrapper>
  ),
};
