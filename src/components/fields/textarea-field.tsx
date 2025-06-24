import type { FieldMetadata } from "@conform-to/react";
import { getTextareaProps } from "@conform-to/react";
import {
  TextArea,
  Label,
  TextField,
  Text,
  type TextFieldProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

interface TextareaFieldProps extends Omit<TextFieldProps, "children"> {
  field: FieldMetadata;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  className?: string;
  textareaClassName?: string;
  rows?: number;
}

export const TextareaField = ({
  field,
  label,
  placeholder,
  required = false,
  description,
  className,
  textareaClassName,
  rows = 4,
  ...props
}: TextareaFieldProps) => {
  const textareaProps = getTextareaProps(field);
  const hasError = field.errors && field.errors.length > 0;

  return (
    <TextField
      {...props}
      className={twMerge("group flex flex-col gap-2", className)}
      isInvalid={hasError}
      isRequired={required}
    >
      <Label className="text-sm font-medium text-gray-900 group-disabled:text-gray-400">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <TextArea
        {...textareaProps}
        rows={rows}
        placeholder={placeholder}
        className={twMerge(
          "px-3 py-2 border border-gray-300 rounded-md shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200",
          "group-invalid:border-red-500 group-invalid:ring-red-500",
          "transition-colors duration-200",
          "resize-vertical min-h-[100px]",
          textareaClassName
        )}
      />

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
    </TextField>
  );
};
