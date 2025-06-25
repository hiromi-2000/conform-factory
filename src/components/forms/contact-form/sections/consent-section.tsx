import { CheckboxField } from "../../../fields";
import { useContactField } from "../contract-form-utilities";

export const ConsentSection = () => {
  const [allowMarketingEmailsField] = useContactField("allowMarketingEmails");
  const [subscribeToNewsletterField] = useContactField("subscribeToNewsletter");
  const [privacyPolicyAcceptedField] = useContactField("privacyPolicyAccepted");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
        設定
      </h2>

      <div className="space-y-4">
        <CheckboxField
          field={allowMarketingEmailsField}
          label="マーケティングメールの受信を許可する"
          description="製品情報やお得な情報をメールで受け取る場合はチェックしてください"
        />

        <CheckboxField
          field={subscribeToNewsletterField}
          label="ニュースレターを購読する"
          description="定期的なニュースレターの配信を希望する場合はチェックしてください"
        />

        <CheckboxField
          field={privacyPolicyAcceptedField}
          label="プライバシーポリシーに同意する"
          description="プライバシーポリシーをお読みいただき、同意の上チェックしてください"
          required
        />
      </div>
    </div>
  );
};
