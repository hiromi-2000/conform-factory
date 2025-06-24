import { InputField } from "../../../fields";
import { useField } from "../create-form";

export const BasicInfoSection = () => {
  const [firstNameField] = useField("firstName");
  const [lastNameField] = useField("lastName");
  const [emailField] = useField("email");
  const [phoneNumberField] = useField("phoneNumber");
  const [companyField] = useField("company");
  const [jobTitleField] = useField("jobTitle");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
        基本情報
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          field={firstNameField}
          label="お名前"
          placeholder="山田"
          required
          description="お名前を入力してください"
        />

        <InputField
          field={lastNameField}
          label="姓"
          placeholder="太郎"
          required
          description="姓を入力してください"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          field={emailField}
          label="メールアドレス"
          placeholder="example@example.com"
          required
          description="連絡可能なメールアドレスを入力してください"
        />

        <InputField
          field={phoneNumberField}
          label="電話番号"
          placeholder="03-1234-5678"
          description="電話での連絡をご希望の場合は必須"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          field={companyField}
          label="会社名"
          placeholder="株式会社サンプル"
          description="法人の場合は会社名を入力してください"
        />

        <InputField
          field={jobTitleField}
          label="職業・役職"
          placeholder="エンジニア"
          description="職業や役職を入力してください"
        />
      </div>
    </div>
  );
};
