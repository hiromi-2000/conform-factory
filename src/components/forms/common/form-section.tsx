import type { ReactNode } from "react";

interface FormSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
  withBottomBorder?: boolean;
}

export const FormSection = ({
  title,
  children,
  className = "",
  withBottomBorder = true,
}: FormSectionProps) => {
  const borderClass = withBottomBorder ? "border-b border-gray-200 pb-6" : "";

  return (
    <div className={`${borderClass} ${className}`}>
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
};
