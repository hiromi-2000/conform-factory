import { InputField } from "@/components/forms/fields/input-field";
import { SelectField } from "@/components/forms/fields/select-field";
import Button from "@/components/button";
import type { FieldMetadata } from "@conform-to/react";
import { useOrganizationFormMetadata } from "../organization-form-utilities";
import type { departmentSchema } from "../organization-schema";
import type z from "zod/v4";

const roleOptions = [
  { value: "Manager", label: "マネージャー" },
  { value: "Engineer", label: "エンジニア" },
  { value: "Designer", label: "デザイナー" },
  { value: "HR", label: "人事" },
];

interface EmployeeSectionProps {
  employeesField: FieldMetadata<
    z.infer<typeof departmentSchema.shape.employees>
  >;
}

export const EmployeeSection = ({ employeesField }: EmployeeSectionProps) => {
  const form = useOrganizationFormMetadata();

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">従業員</h4>

      {employeesField.getFieldList().map((employee, empIndex) => {
        const empFields = employee.getFieldset();

        return (
          <div
            key={employee.key}
            className="border border-gray-200 rounded-md p-3 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-medium text-gray-600">
                従業員 {empIndex + 1}
              </h5>
              <Button
                {...form.remove.getButtonProps({
                  name: employeesField.name,
                  index: empIndex,
                })}
                color="delete-secondary"
                size="sm"
                type="submit"
              >
                削除
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                field={empFields.name}
                label="氏名"
                placeholder="山田太郎"
                required
              />
              <SelectField
                field={empFields.role}
                label="役職"
                options={roleOptions}
                required
              />
              <InputField
                field={empFields.email}
                label="メールアドレス"
                placeholder="yamada@company.com"
                required
              />
              <InputField
                field={empFields.contact.getFieldset().workPhone}
                label="業務電話"
                placeholder="03-1234-5678"
                required
              />
              <InputField
                field={empFields.contact.getFieldset().personalPhone}
                label="個人電話（任意）"
                placeholder="090-1234-5678"
              />
            </div>
          </div>
        );
      })}

      <Button
        {...form.insert.getButtonProps({
          name: employeesField.name,
        })}
        color="secondary"
        size="sm"
        type="submit"
        className="w-full"
      >
        ＋ 従業員追加
      </Button>
    </div>
  );
};
