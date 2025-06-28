import type { ReactNode } from "react";

interface FormActionsProps {
  children: ReactNode;
  className?: string;
  withTopBorder?: boolean;
}

export const FormActions = ({ children, className = "" }: FormActionsProps) => {
  return (
    <div className={className}>
      <div className="flex gap-4">{children}</div>
    </div>
  );
};
