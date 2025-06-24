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
  title = "お問い合わせフォーム",
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
    <div
      className={twMerge(
        "max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg",
        className
      )}
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>

      {/* formFactoryで生成されたFormコンポーネント */}
      <Form form={form} className="space-y-6">
        {/* 基本情報セクション */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              field={fields.firstName}
              label="名前"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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

        {/* お問い合わせ内容セクション */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            お問い合わせ内容
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="mt-4">
            <InputField
              field={fields.subject}
              label="件名"
              placeholder="お問い合わせの件名を入力してください"
              required
              description="分かりやすい件名を入力してください"
            />
          </div>

          <div className="mt-4">
            <TextareaField
              field={fields.message}
              label="お問い合わせ内容"
              placeholder="詳細なお問い合わせ内容をご記入ください..."
              rows={6}
              required
              description="具体的な内容をご記入ください（10文字以上2000文字以内）"
            />
          </div>
        </div>

        {/* 連絡先設定セクション */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            連絡先設定
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* プライバシー・マーケティング設定 */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            その他の設定
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

        {/* フォーム送信ボタン */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            className={twMerge(
              "flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-md",
              "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "disabled:bg-gray-400 disabled:cursor-not-allowed",
              "transition-colors duration-200"
            )}
            isDisabled={!form.valid}
          >
            お問い合わせを送信
          </Button>

          <Button
            type="reset"
            className={twMerge(
              "px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md",
              "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
              "transition-colors duration-200"
            )}
            onPress={() => form.reset()}
          >
            リセット
          </Button>
        </div>

        {/* フォーム状態表示（開発用） */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              開発用: フォーム状態
            </h3>
            <pre className="text-xs text-gray-600 overflow-auto">
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
