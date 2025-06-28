import type { ReactNode } from "react";

interface FormContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
  maxWidth?: "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
}

export const FormContainer = ({
  title,
  children,
  className = "",
  maxWidth = "4xl",
}: FormContainerProps) => {
  const maxWidthClass = {
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  }[maxWidth];

  return (
    <div
      className={`${maxWidthClass} mx-auto p-6 bg-white shadow-lg rounded-lg ${className}`}
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
      {children}
    </div>
  );
};
