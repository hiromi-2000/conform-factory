import { InputField } from "@/components/forms/fields/input-field";
import { useOrganizationField } from "../organization-form-utilities";
import { FormDisclosureSection } from "@/components/forms/common/form-disclosure-section";

export const AddressSection = () => {
  const [fields] = useOrganizationField("address");
  const { country, zipCode, state, city, street } = fields.getFieldset();
  return (
    <FormDisclosureSection title="住所" field={fields}>
      <InputField
        field={country}
        label="国"
        placeholder="例：日本"
        shouldShowError={false}
      />
      <InputField
        field={zipCode}
        label="郵便番号"
        placeholder="例：123-4567"
        shouldShowError={false}
      />
      <InputField
        field={state}
        label="都道府県"
        placeholder="例：東京都"
        shouldShowError={false}
      />
      <InputField
        field={city}
        label="市区町村"
        placeholder="例：新宿区"
        shouldShowError={false}
      />
      <InputField
        field={street}
        label="番地"
        placeholder="例：西新宿1-1-1"
        shouldShowError={false}
      />
    </FormDisclosureSection>
  );
};
