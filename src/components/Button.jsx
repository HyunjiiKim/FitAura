import { cva } from "class-variance-authority";

/** Base + variants */
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-regular transition-colors " +
  "focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      intent: {
        primary:   "bg-primary-1 hover:bg-primary-2 text-white",
        secondary: "bg-secondary-1 hover:bg-secondary-2 text-white",
        white: "bg-white hover:bg-gray-400 text-tertiary-3 hover:text-white",
        danger:    "bg-red-600 hover:bg-red-700 text-white"
      },
      size: {
        xs: "px-[43px] py-[10px] text-xs w-[160px]",
        sm: "px-3 py-[6px] text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg"
      }
    },
    defaultVariants: {
      intent: "primary",
      size: "md"
    }
  }
);

export default function Button({
  label,
  intent,
  size,
  custom = "",
  disabled = false,
  onClick,
}) {
  return (
    <button
      disabled={disabled}
      className={buttonVariants({ intent, size, className: custom })}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
