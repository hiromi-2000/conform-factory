import type { FieldMetadata } from "@conform-to/react";
import { getSelectProps } from "@conform-to/react";
import {
  Select,
  Label,
  Button,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
  Text,
  type SelectProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<SelectProps<SelectOption>, "children"> {
  field: FieldMetadata;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  className?: string;
  options: SelectOption[];
}

export const SelectField = ({
  field,
  label,
  placeholder = "選択してください",
  required = false,
  description,
  className,
  options,
  ...props
}: SelectFieldProps) => {
  const selectProps = getSelectProps(field);
  const hasError = field.errors && field.errors.length > 0;

  return (
    <Select
      {...selectProps}
      {...props}
      className={twMerge("group flex flex-col gap-2", className)}
      isInvalid={hasError}
      isRequired={required}
    >
      <Label className="text-sm font-medium text-gray-900 group-disabled:text-gray-400">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <Button
        className={twMerge(
          "px-3 py-2 border border-gray-300 rounded-md shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200",
          "group-invalid:border-red-500 group-invalid:ring-red-500",
          "transition-colors duration-200",
          "flex items-center justify-between",
          "bg-white text-left"
        )}
      >
        <SelectValue className="text-gray-900 group-disabled:text-gray-500">
          {({ isPlaceholder, selectedText }) => (
            <span className={isPlaceholder ? "text-gray-500" : "text-gray-900"}>
              {selectedText || placeholder}
            </span>
          )}
        </SelectValue>
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </Button>

      <Popover className="w-[var(--trigger-width)] bg-white border border-gray-300 rounded-md shadow-lg">
        <ListBox className="max-h-60 overflow-auto p-1">
          {options.map((option) => (
            <ListBoxItem
              key={option.value}
              id={option.value}
              className={twMerge(
                "px-3 py-2 text-sm cursor-pointer rounded",
                "hover:bg-blue-50 focus:bg-blue-50 focus:outline-none",
                "selected:bg-blue-100 selected:text-blue-900"
              )}
            >
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>

      {description && (
        <Text slot="description" className="text-sm text-gray-600">
          {description}
        </Text>
      )}

      {hasError && (
        <Text slot="errorMessage" className="text-sm text-red-600">
          {field.errors?.[0]}
        </Text>
      )}
    </Select>
  );
};
