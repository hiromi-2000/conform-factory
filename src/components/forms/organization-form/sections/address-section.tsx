import { InputField } from "@/components/fields/input-field";
import { useOrganizationField } from "../organization-form-utilities";
import { getFieldsetProps } from "@conform-to/react";
import {
  Button,
  Disclosure,
  DisclosurePanel,
  Heading,
  Text,
} from "react-aria-components";

export const AddressSection = () => {
  const [fields] = useOrganizationField("address");
  const { country, zipCode, state, city, street } = fields.getFieldset();
  return (
    <fieldset {...getFieldsetProps(fields)}>
      <Disclosure>
        <Heading>
          <legend className="text-sm font-medium text-gray-900 group-disabled:text-gray-400 flex items-center gap-2">
            住所
            <Button aria-label="住所の詳細を表示" slot="trigger">
              <svg viewBox="0 0 12 12">
                <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          </legend>
          {Object.entries(fields.allErrors).map(([key, error]) => (
            <div key={key}>
              <Text slot="errorMessage" className="text-sm text-red-600">
                {error}
              </Text>
            </div>
          ))}
        </Heading>
        <DisclosurePanel className="border border-gray-300 rounded-lg p-4 flex flex-col gap-3 mt-1">
          <InputField field={country} label="国" />
          <InputField field={zipCode} label="郵便番号" />
          <InputField field={state} label="都道府県" />
          <InputField field={city} label="市区町村" />
          <InputField field={street} label="番地" />
        </DisclosurePanel>
      </Disclosure>
    </fieldset>
  );
};
