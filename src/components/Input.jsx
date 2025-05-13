import { cva } from "class-variance-authority";

const inputVariants = cva([], {
  variants: {
    intent: {
      default: [],
      error: []
    },
    size: {
      xs: [],
      sm: [],
      md: [],
      lg: [],
      xl: []
    }
  },
  defaultVariants: {
    intent: "default",
    size: "md"
  }
});

export default function Input({
  custom = "",
  intent,
  size,
  type = "text",
  placeholder = "",
  value,
  onChange
}) {
  return (
    <input
      className={`${inputVariants({ intent, size })} ${custom}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
