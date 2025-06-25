import { useProductField } from "../product-form-utilities";
import { InputField, TextareaField } from "../../../fields";

export const BasicInfoSection = () => {
  const [nameField] = useProductField("name");
  const [descriptionField] = useProductField("description");

  return (
    <section>
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">基本情報</h2>
        <p className="text-sm text-gray-600 mt-1">
          商品の基本的な情報を入力してください
        </p>
      </div>

      <div className="space-y-6">
        <InputField
          label="商品名"
          placeholder="商品名を入力してください"
          field={nameField}
          required
        />

        <TextareaField
          label="商品説明"
          placeholder="商品の詳細な説明を入力してください（10文字以上1000文字以内）"
          field={descriptionField}
          required
          rows={4}
        />
      </div>
    </section>
  );
};
