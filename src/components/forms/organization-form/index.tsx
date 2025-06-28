import { DatePickerField } from "@/components/fields/datepicker-field";
import {
  useOrganizationForm,
  OrganizationForm as Form,
} from "./organization-form-utilities";
import { InputField } from "@/components/fields/input-field";
import { AddressSection } from "./sections/address-section";

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
    <Form form={form} className="space-y-6 p-8">
      <InputField
        field={fields.organizationName}
        label="組織名"
        placeholder="株式会社サンプル"
      />
      <DatePickerField field={fields.establishedDate} label="設立日" />
      <AddressSection />
      <button type="submit">送信</button>
    </Form>
  );
};
