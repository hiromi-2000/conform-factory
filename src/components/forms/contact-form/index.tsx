import {
  contactFormSchema,
  contactTypes,
  priorityLevels,
  type ContactFormData,
} from "../../../schemas/contactSchema";
import { parseWithZod } from "@conform-to/zod/v4";
import {
  InputField,
  SelectField,
  TextareaField,
  CheckboxField,
} from "../../fields";
import { Button } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { Form, useForm } from "./create-form";

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  className?: string;
  title?: string;
}

export const ContactForm = ({
  onSubmit,
  className,
  title = "お問い合わせ",
}: ContactFormProps) => {
  // formFactory使用 - 型安全で簡潔！
  const [form, fields] = useForm({
    // [Conformドキュメント参考](https://ja.conform.guide/validation)
    // クライアントサイドバリデーション設定
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onSubmit(event, { formData }) {
      event.preventDefault();

      // formFactoryで既にバリデーション済みなので、parseWithZodで最終確認
      const submission = parseWithZod(formData, { schema: contactFormSchema });

      if (submission.status === "success" && onSubmit) {
        onSubmit(submission.value);
      }
    },
  });

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

  // 希望連絡方法のオプション
  const contactMethodOptions = [
    { value: "email", label: "メール" },
    { value: "phone", label: "電話" },
    { value: "both", label: "メール・電話両方" },
  ];

  return (
    <div className={twMerge("max-w-3xl mx-auto p-8", className)}>
      {/* ヘッダー */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">お気軽にお問い合わせください</p>
      </div>

      {/* formFactoryで生成されたFormコンポーネント */}
      <Form
        form={form}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-8 space-y-8">
          {/* 基本情報 */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
              基本情報
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                field={fields.firstName}
                label="お名前"
                placeholder="山田"
                required
                description="お名前を入力してください"
              />

              <InputField
                field={fields.lastName}
                label="姓"
                placeholder="太郎"
                required
                description="姓を入力してください"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                field={fields.email}
                label="メールアドレス"
                placeholder="example@example.com"
                required
                description="連絡可能なメールアドレスを入力してください"
              />

              <InputField
                field={fields.phoneNumber}
                label="電話番号"
                placeholder="03-1234-5678"
                description="電話での連絡をご希望の場合は必須"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                field={fields.company}
                label="会社名"
                placeholder="株式会社サンプル"
                description="法人の場合は会社名を入力してください"
              />

              <InputField
                field={fields.jobTitle}
                label="職業・役職"
                placeholder="エンジニア"
                description="職業や役職を入力してください"
              />
            </div>
          </div>

          {/* お問い合わせ内容 */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
              お問い合わせ内容
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                field={fields.contactType}
                label="お問い合わせ種別"
                options={contactTypeOptions}
                required
                description="お問い合わせの種類を選択してください"
              />

              <SelectField
                field={fields.priority}
                label="優先度"
                options={priorityOptions}
                description="緊急度を選択してください"
              />
            </div>

            <InputField
              field={fields.subject}
              label="件名"
              placeholder="お問い合わせの件名を入力してください"
              required
              description="分かりやすい件名を入力してください"
            />

            <TextareaField
              field={fields.message}
              label="お問い合わせ内容"
              placeholder="詳細なお問い合わせ内容をご記入ください..."
              rows={6}
              required
              description="具体的な内容をご記入ください（10文字以上2000文字以内）"
            />
          </div>

          {/* 連絡設定 */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
              連絡設定
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                field={fields.preferredContactMethod}
                label="希望連絡方法"
                options={contactMethodOptions}
                description="ご希望の連絡方法を選択してください"
              />

              <InputField
                field={fields.bestTimeToContact}
                label="連絡希望時間"
                placeholder="平日 9:00-18:00"
                description="連絡しやすい時間帯を教えてください"
              />
            </div>
          </div>

          {/* チェックボックス設定 */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
              設定
            </h2>

            <div className="space-y-4">
              <CheckboxField
                field={fields.allowMarketingEmails}
                label="マーケティングメールの受信を許可する"
                description="製品情報やお得な情報をメールで受け取る場合はチェックしてください"
              />

              <CheckboxField
                field={fields.subscribeToNewsletter}
                label="ニュースレターを購読する"
                description="定期的なニュースレターの配信を希望する場合はチェックしてください"
              />

              <CheckboxField
                field={fields.privacyPolicyAccepted}
                label="プライバシーポリシーに同意する"
                description="プライバシーポリシーをお読みいただき、同意の上チェックしてください"
                required
              />
            </div>
          </div>
        </div>

        {/* フォーム送信ボタン */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              className={twMerge(
                "flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl",
                "hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30",
                "disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed",
                "transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]",
                "shadow-lg hover:shadow-xl"
              )}
              isDisabled={!form.valid}
            >
              お問い合わせを送信
            </Button>

            <Button
              type="reset"
              className={twMerge(
                "px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl",
                "hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-500/30",
                "transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]",
                "shadow-sm hover:shadow-md"
              )}
              onPress={() => form.reset()}
            >
              リセット
            </Button>
          </div>
        </div>

        {/* フォーム状態表示（開発用） */}
        {process.env.NODE_ENV === "development" && (
          <div className="mx-8 mb-8 p-4 bg-gray-900 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">
              開発用: フォーム状態
            </h3>
            <pre className="text-xs text-gray-400 overflow-auto">
              {JSON.stringify(
                {
                  status: form.status,
                  errors: form.allErrors,
                  value: form.value,
                },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </Form>
    </div>
  );
};
