import { InputField, SelectField, TextareaField } from "../../../fields";
import { useField } from "../create-form";
import {
  contactTypes,
  priorityLevels,
} from "../../../../schemas/contactSchema";

export const ContactContentSection = () => {
  const [contactTypeField] = useField("contactType");
  const [priorityField] = useField("priority");
  const [subjectField] = useField("subject");
  const [messageField] = useField("message");

  // お問い合わせ種別のオプション
  const contactTypeOptions = contactTypes.map((type) => ({
    value: type,
    label: {
      general: "一般的なお問い合わせ",
      support: "サポート",
      sales: "営業・販売",
      technical: "技術的な問題",
      billing: "請求・支払い",
      partnership: "パートナーシップ",
      press: "報道関係",
      other: "その他",
    }[type],
  }));

  // 優先度のオプション
  const priorityOptions = priorityLevels.map((level) => ({
    value: level,
    label: {
      low: "低",
      normal: "通常",
      high: "高",
      urgent: "緊急",
    }[level],
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
        お問い合わせ内容
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          field={contactTypeField}
          label="お問い合わせ種別"
          options={contactTypeOptions}
          required
          description="お問い合わせの種類を選択してください"
        />

        <SelectField
          field={priorityField}
          label="優先度"
          options={priorityOptions}
          description="緊急度を選択してください"
        />
      </div>

      <InputField
        field={subjectField}
        label="件名"
        placeholder="お問い合わせの件名を入力してください"
        required
        description="分かりやすい件名を入力してください"
      />

      <TextareaField
        field={messageField}
        label="お問い合わせ内容"
        placeholder="詳細なお問い合わせ内容をご記入ください..."
        rows={6}
        required
        description="具体的な内容をご記入ください（10文字以上2000文字以内）"
      />
    </div>
  );
};
