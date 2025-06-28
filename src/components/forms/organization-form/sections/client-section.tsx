import { InputField } from "@/components/forms/fields/input-field";
import { FormDisclosureSection } from "@/components/forms/common/form-disclosure-section";
import {
  useOrganizationField,
  useOrganizationFormMetadata,
} from "../organization-form-utilities";
import Button from "@/components/button";

export const ClientSection = () => {
  const form = useOrganizationFormMetadata();
  const [fields] = useOrganizationField("clients");

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        組織の顧客情報を追加してください（任意）
      </p>

      {fields.getFieldList().map((client, clientIndex) => {
        const clientFields = client.getFieldset();

        return (
          <FormDisclosureSection
            key={client.key}
            title={`顧客 ${clientIndex + 1}: ${clientFields.companyName.value || "未設定"}`}
            field={client}
            defaultExpanded={clientIndex === 0}
          >
            <div className="space-y-4">
              {/* 会社名 */}
              <InputField
                field={clientFields.companyName}
                label="会社名"
                placeholder="例: 株式会社サンプル"
                required
                shouldShowError={false}
              />

              {/* 担当者名 */}
              <InputField
                field={clientFields.contactPerson}
                label="担当者名"
                placeholder="例: 田中太郎"
                required
                shouldShowError={false}
              />

              {/* 担当者メールアドレス */}
              <InputField
                field={clientFields.contactEmail}
                label="担当者メールアドレス"
                placeholder="例: tanaka@sample-corp.com"
                required
                shouldShowError={false}
              />

              {/* 顧客削除ボタン */}
              <div className="pt-4 border-t border-gray-200">
                <Button
                  {...form.remove.getButtonProps({
                    name: fields.name,
                    index: clientIndex,
                  })}
                  color="delete-secondary"
                  size="sm"
                  type="submit"
                  className="w-full"
                >
                  この顧客を削除
                </Button>
              </div>
            </div>
          </FormDisclosureSection>
        );
      })}

      {/* 顧客追加ボタン */}
      <Button
        {...form.insert.getButtonProps({
          name: fields.name,
        })}
        color="secondary"
        className="w-full"
        type="submit"
      >
        ＋ 顧客を追加
      </Button>
    </div>
  );
};
