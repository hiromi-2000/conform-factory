import type { FieldMetadata } from "@conform-to/react";
import { getInputProps } from "@conform-to/react";
import { Checkbox, Text, type CheckboxProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { CheckIcon } from "@heroicons/react/24/outline";

interface CheckboxFieldProps extends Omit<CheckboxProps, "children"> {
  field: FieldMetadata;
  label: string;
  description?: string;
  className?: string;
  required?: boolean;
}

export const CheckboxField = ({
  field,
  label,
  description,
  className,
  required = false,
  ...props
}: CheckboxFieldProps) => {
  const inputProps = getInputProps(field, { type: "checkbox" });
  const hasError = field.errors && field.errors.length > 0;

  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <Checkbox
        {...inputProps}
        {...props}
        className={twMerge(
          "group flex items-start gap-3",
          "focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500",
          hasError && "text-red-600"
        )}
        isInvalid={hasError}
        isRequired={required}
      >
        <div className="flex items-center h-5">
          <div
            className={twMerge(
              "w-4 h-4 border-2 rounded",
              "group-selected:bg-blue-600 group-selected:border-blue-600",
              "group-invalid:border-red-500",
              "border-gray-300 bg-white",
              "transition-colors duration-200",
              "flex items-center justify-center"
            )}
          >
            <CheckIcon className="w-3 h-3 text-white opacity-0 group-selected:opacity-100 transition-opacity duration-200" />
          </div>
        </div>

        <div className="flex flex-col">
          <Text
            className={twMerge(
              "text-sm font-medium text-gray-900",
              hasError && "text-red-600"
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Text>

          {description && (
            <Text className="text-sm text-gray-600 mt-1">{description}</Text>
          )}
        </div>
      </Checkbox>

      {hasError && (
        <Text className="text-sm text-red-600 ml-7">{field.errors?.[0]}</Text>
      )}
    </div>
  );
};
