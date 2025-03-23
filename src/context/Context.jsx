import { createContext, use, useState } from "react";
import run from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function(){
            setResultData(prev => prev+nextWord)
        }, 75*index)
    }

    const onSent = async () => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompts(prev => [...prev, input])

        const response = await run(input);
        let responseArr = response.split("**");
        let newResponse = "";
        // FIXXXXXXX
        for (let i = 0; i < responseArr.length; i++) {
            newResponse += (i % 2 === 0) ? responseArr[i] : "<b>" + responseArr[i] + "</b>"
            // if (i % 2 === 0) newArr += responseArr[i]
            // else newArr += "<b>" + responseArr[i] + "</b>"
        }
        let newResponse2 = newResponse.split("*").join("</br")
        // let newResponseArr = newResponse2.split(" ")
        // for (let j = 0; j <newResponseArr.length; j++) {
        //     delayPara(j, newResponseArr[j]+" ")
        // }
        setResultData(newResponse2);

        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;