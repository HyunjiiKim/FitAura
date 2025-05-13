import { cva } from "class-variance-authority";

const InputVariants = cva([],{
    variants: {
        intent:{
            default: [],
            error: [],
        },
        size: {
            xs: [],
            sm: [],
            md: [],
            lg: [],
            xl: []
        }
    },
    defaultVariants:{
        intent: "default",
        size: "md"
    }
}
)

const Input = ({custom, intent, size, type, placeholder}) => {
    return (
        <input
            className={`${InputVariants({intent, size,})} ${custom}`}
            type={type??"text"}
            placeholder={placeholder}
        />
    )
}
export default Input;