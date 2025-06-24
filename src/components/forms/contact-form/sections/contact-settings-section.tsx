import { InputField, SelectField } from "../../../fields";
import { useField } from "../create-form";

export const ContactSettingsSection = () => {
  const [preferredContactMethodField] = useField("preferredContactMethod");
  const [bestTimeToContactField] = useField("bestTimeToContact");

  // 希望連絡方法のオプション
  const contactMethodOptions = [
    { value: "email", label: "メール" },
    { value: "phone", label: "電話" },
    { value: "both", label: "メール・電話両方" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
        連絡設定
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          field={preferredContactMethodField}
          label="希望連絡方法"
          options={contactMethodOptions}
          description="ご希望の連絡方法を選択してください"
        />

        <InputField
          field={bestTimeToContactField}
          label="連絡希望時間"
          placeholder="平日 9:00-18:00"
          description="連絡しやすい時間帯を教えてください"
        />
      </div>
    </div>
  );
};
