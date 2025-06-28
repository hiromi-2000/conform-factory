import { InputField } from "@/components/forms/fields/input-field";
import { FormDisclosureSection } from "@/components/forms/common/form-disclosure-section";
import {
  useOrganizationField,
  useOrganizationFormMetadata,
} from "../organization-form-utilities";
import { EmployeeSection } from "./employee-section";
import Button from "@/components/button";

export const DepartmentSection = () => {
  const form = useOrganizationFormMetadata();
  const [fields] = useOrganizationField("departments");

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">組織の部署情報を追加してください</p>

      {fields.getFieldList().map((department, deptIndex) => {
        const deptFields = department.getFieldset();

        return (
          <FormDisclosureSection
            key={department.key}
            title={`部署 ${deptIndex + 1}: ${deptFields.name.value || "未設定"}`}
            field={department}
            defaultExpanded={deptIndex === 0}
          >
            <div className="space-y-4">
              {/* 部署名 */}
              <InputField
                field={deptFields.name}
                label="部署名"
                placeholder="例: 開発部"
                required
                shouldShowError={false}
              />

              {/* 部署の従業員 */}
              <EmployeeSection employeesField={deptFields.employees} />

              {/* 部署削除ボタン */}
              <div className="pt-4 border-t border-gray-200">
                <Button
                  {...form.remove.getButtonProps({
                    name: fields.name,
                    index: deptIndex,
                  })}
                  color="delete-secondary"
                  size="sm"
                  type="submit"
                  className="w-full"
                >
                  この部署を削除
                </Button>
              </div>
            </div>
          </FormDisclosureSection>
        );
      })}

      {/* 部署追加ボタン */}
      <Button
        {...form.insert.getButtonProps({
          name: fields.name,
        })}
        color="secondary"
        className="w-full"
        type="submit"
      >
        ＋ 部署を追加
      </Button>
    </div>
  );
};
