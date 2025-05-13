import { cva } from "class-variance-authority";

const inputVariants = cva(["bg-white py-2 w-[250px] text-center rounded-md"], {
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
  onChange,
  ...rest
}) {
  return (
    <input
      className={`${inputVariants({ intent, size })} ${custom}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}


export function InputRadio({
    id,
    name,
    value,
    checked,
    onChange,
    label,
    className = ""
  }) {
    const base =
      "inline-flex items-center justify-center px-8 py-2 rounded-md border cursor-pointer select-none " +
      "transition-colors border-none text-tertiary-3";
  
    const active   = "bg-primary-1";
    const inactive = "bg-white"
    return (
      <label
        htmlFor={id}
        className={`${base} ${checked ? active : inactive} ${className}`}
      >
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        {label}
      </label>
    );
  }