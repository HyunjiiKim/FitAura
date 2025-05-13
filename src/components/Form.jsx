import { useRef } from "react"

import Button from "./Button"

const Form = ({ title, questions}) => {
    
    const questionRef = useRef(0);
    // arrange questions property with index
    try{

    } catch (err) {
        
    }

    return(
        <div>
            <h1>{title}</h1>
            {questions.map((items)=><Button key={items} />)}        
        </div>
    )
}