import { DatePickerField } from "@/components/forms/fields/datepicker-field";
import {
  useOrganizationForm,
  OrganizationForm as Form,
} from "./organization-form-utilities";
import { InputField } from "@/components/forms/fields/input-field";
import { AddressSection } from "./sections/address-section";
import Button from "@/components/button";
import { FormContainer } from "@/components/forms/common/form-container";
import { FormSection } from "@/components/forms/common/form-section";
import { FormActions } from "@/components/forms/common/form-actions";
import { DepartmentSection } from "./sections/department-section";
import { ClientSection } from "./sections/client-section";

export const OrganizationForm = () => {
  const [form, fields] = useOrganizationForm({
    onSubmit: (event, { submission }) => {
      event.preventDefault();
      if (submission?.status === "success") {
        console.log("フォーム送信成功:", submission.value);
      }
    },
  });

  return (
    <FormContainer title="組織登録フォーム">
      <Form form={form} className="space-y-6">
        <FormSection title="基本情報">
          <div className="space-y-4">
            <InputField
              field={fields.organizationName}
              label="組織名"
              placeholder="株式会社サンプル"
            />
            <DatePickerField field={fields.establishedDate} label="設立日" />
          </div>
        </FormSection>

        <FormSection title="住所情報">
          <AddressSection />
        </FormSection>

        <FormSection title="部署情報">
          <DepartmentSection />
        </FormSection>

        <FormSection title="クライアント情報">
          <ClientSection />
        </FormSection>

        <FormActions>
          <Button type="submit">送信</Button>
        </FormActions>
      </Form>
    </FormContainer>
  );
};
