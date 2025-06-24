import { InputField, SelectField } from "../../../fields";
import { useField } from "../create-form";

export const BasicInfoSection = () => {
  const [firstNameField] = useField("firstName");
  const [lastNameField] = useField("lastName");
  const [emailField] = useField("email");
  const [contactTypeField] = useField("contactType");

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 pb-3 border-b border-gray-200">
        基本情報
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          field={firstNameField}
          label="お名前（姓）"
          placeholder="山田"
          required
        />

        <InputField
          field={lastNameField}
          label="お名前（名）"
          placeholder="太郎"
          required
        />
      </div>

      <InputField
        field={emailField}
        label="メールアドレス"
        type="email"
        placeholder="example@email.com"
        required
      />

      <SelectField
        field={contactTypeField}
        label="お問い合わせ種別"
        options={[
          { value: "inquiry", label: "一般的なお問い合わせ" },
          { value: "support", label: "サポート" },
          { value: "business", label: "ビジネス相談" },
          { value: "other", label: "その他" },
        ]}
        required
      />
    </section>
  );
};
