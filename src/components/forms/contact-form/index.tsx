import {
  contactFormSchema,
  type ContactFormData,
} from "../../../schemas/contactSchema";
import { parseWithZod } from "@conform-to/zod/v4";
import { twMerge } from "tailwind-merge";
import { Form, useForm } from "./create-form";
import {
  BasicInfoSection,
  ContactContentSection,
  ContactSettingsSection,
  ConsentSection,
  FormActionsSection,
} from "./sections";

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
  const [form] = useForm({
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
          {/* 各セクションでuseFieldを使用 */}
          <BasicInfoSection />
          <ContactContentSection />
          <ContactSettingsSection />
          <ConsentSection />
        </div>

        {/* useFormMetadataを活用したアクションセクション */}
        <FormActionsSection onReset={() => form.reset()} />
      </Form>
    </div>
  );
};
