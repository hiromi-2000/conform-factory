import type { ReactNode } from "react";
import { getFieldsetProps } from "@conform-to/react";
import {
  Button,
  Disclosure,
  DisclosurePanel,
  Heading,
  Text,
} from "react-aria-components";
import type { FieldMetadata } from "@conform-to/react";

interface FormDisclosureSectionProps {
  title: string;
  children: ReactNode;
  field: FieldMetadata;
  defaultExpanded?: boolean;
  className?: string;
  errorSlot?: ReactNode;
}

export const FormDisclosureSection = ({
  title,
  children,
  field,
  defaultExpanded = true,
  className = "",
  errorSlot,
}: FormDisclosureSectionProps) => {
  return (
    <fieldset {...getFieldsetProps(field)}>
      <Disclosure defaultExpanded={defaultExpanded}>
        <Heading>
          <legend className="text-sm font-medium text-gray-900 group-disabled:text-gray-400 flex items-center gap-1">
            {title}
            <Button
              aria-label={`${title}の詳細を表示`}
              className="group cursor-pointer"
              slot="trigger"
              type="button"
            >
              <svg
                className="stroke-current w-4 h-4 rotate-0 fill-none group-aria-expanded:rotate-90 transition-transform duration-200"
                viewBox="0 0 24 24"
              >
                <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          </legend>
        </Heading>
        <DisclosurePanel>
          <div
            className={`p-4 flex flex-col gap-3 border border-gray-300 rounded-lg mt-2 ${className}`}
          >
            {children}
          </div>
        </DisclosurePanel>
      </Disclosure>
      {errorSlot
        ? errorSlot
        : Object.entries(field.allErrors).map(([key, error]) => (
            <div key={key}>
              <Text slot="errorMessage" className="text-sm text-red-600">
                {error}
              </Text>
            </div>
          ))}
    </fieldset>
  );
};
