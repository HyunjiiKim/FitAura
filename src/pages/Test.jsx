import { useState } from "react";

// components
import Input from "../components/Input";
import Button from "../components/Button";

const Test = () => {
    const [showPage, setShowPage] = useState({
        personalInfo: true,
        goal: false,
    })
    return(
        <div id="test" className="flex flex-col justify-center items-center p-4">
            { showPage.personalInfo &&
            (
                <div id="personalInfo" className="mt-10 w-80 flex flex-col gap-5">
                    <h1 className="font-bold text-2xl">Informations personnelles</h1>
                    <div className="flex justify-between w-50">
                        <label htmlFor="male">
                            <input type="radio" name="sex" id="0" value="male" />
                            Homme
                        </label>
                        <label htmlFor="male">
                            <input type="radio" name="sex" id="1" value="female" />
                            Femme
                        </label>
                    </div>
                    <Input placeholder="age" />
                    <Input placeholder="taille"/>
                    <Input placeholder="poids" />
                    <Button label="Ensuite" onClick={()=>{setShowPage({personalInfo:false, goal: true })}} />
                </div>
            )}
            { showPage.goal &&
            (
                <div id="goal"className="mt-10 w-80 flex flex-col gap-5 items-center">
                    <h1 className="font-bold text-2xl">Goal</h1>
                    <Button label="Ensuite" onClick={()=>{setShowPage({personalInfo:false, goal: true })}} />
                    <span onClick={()=>{setShowPage({personalInfo:true, goal: false })}}>Retour</span>     
                </div>
            )}
       
        </div>
    )
}

export default Test;