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
    }
}
)

const Input = ({className, intent, size, ...props}) => {
    return (
        <input
            className={InputVariants({intent, size, className})}
            {...props}
        />
    )
}
export default Input;