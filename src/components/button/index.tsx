import type { ButtonProps } from "react-aria-components";
import { Button as AriaButton } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: [
    "inline-flex items-center justify-center border border-transparent font-medium rounded-md",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:cursor-not-allowed",
    "transition-colors duration-200",
    "cursor-pointer",
  ],
  variants: {
    color: {
      primary:
        "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-sm disabled:shadow-none disabled:[filter:brightness(0.75)]",
      secondary:
        "text-gray-700 bg-white border-gray-300 hover:bg-gray-100 focus:ring-blue-500 disabled:text-gray-300 disabled:border-gray-200 disabled:bg-gray-50 disabled:hover:bg-gray-50",
      delete:
        "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-sm disabled:shadow-none disabled:[filter:brightness(0.75)]",
      "delete-secondary":
        "text-red-600 bg-white border-red-300 hover:bg-red-100 focus:ring-red-500 disabled:text-red-300 disabled:border-red-200 disabled:bg-gray-50 disabled:hover:bg-gray-50",
    },
    size: {
      xs: "px-2.5 py-1.5 text-xs",
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-4 py-2 text-base",
      xl: "px-6 py-3 text-base",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

type ButtonVariantProps = VariantProps<typeof button>;

const Button = ({
  className,
  color,
  size,
  disabled,
  ...props
}: ButtonProps &
  ButtonVariantProps & { className?: string; disabled?: boolean }) => {
  return (
    <AriaButton
      {...props}
      isDisabled={disabled}
      className={button({ color, size, className })}
    />
  );
};

export default Button;
