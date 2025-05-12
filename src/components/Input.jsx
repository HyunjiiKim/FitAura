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