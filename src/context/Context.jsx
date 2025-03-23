import { createContext, use, useState } from "react";
import run from "../config/gemini";
import { v4 as uuidv4 } from 'uuid';


export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [chats, setChats] = useState([]); // {id, title, chatHistory: chatHistory}
    const [currChat, setCurrChat] = useState(null);

    const loadChat = (id) => {
        let newChat = chats.find(c => c.id === id);
        setCurrChat(newChat);
        console.log(currChat);
        setLoading(false);
        setShowResult(true);
    }

    // const delayPara = (index, nextWord) => {
    //     setTimeout(function(){
    //         setResultData(prev => prev+nextWord)
    //     }, 75*index)
    // }

    const newChat = () => {
        setCurrChat(null);
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        // new chat - make new chat id, then add to chats
        let chatToUpdate = currChat;
        if (currChat === null) {
            chatToUpdate = { id: uuidv4(), title: input, chatHistory: [] };
            setCurrChat(chatToUpdate);
            setChats(prev => [...prev, chatToUpdate]);
        }

        const userMessage = (prompt !== undefined) ? prompt : input;
        setInput("");

        setCurrChat(prevChat => {
            const updatedChat = {
                ...prevChat,
                chatHistory: [...prevChat.chatHistory, { role: "user", text: userMessage }]
            };
    
            // Update the chats array inside the same function to ensure sync
            setChats(prevChats => 
                prevChats.map(chat => 
                    chat.id === updatedChat.id ? updatedChat : chat
                )
            );
    
            return updatedChat;
        });
        
        setCurrChat(prevChat => ({
            ...prevChat,
            chatHistory: [...prevChat.chatHistory, { role: "ai", text: "Just a sec..." }] // for loading
        }));
        
        let response = await run(userMessage);

        // FIXX
        let formattedResponse = response
        .split("**")
        .map((part, i) => (i % 2 === 0 ? part : `<b>${part}</b>`))
        .join("")
        .split("*")
        .join("</br>");

        setLoading(false);

        setResultData(formattedResponse);

        setCurrChat(prevChat => {
            const updatedChat = {
                ...prevChat,
                chatHistory: prevChat.chatHistory.map((message, index) =>
                    index === prevChat.chatHistory.length - 1 && message.text === "Just a sec..."
                    ? { ...message, text: formattedResponse }
                    : message
                )
            };
    
            // Update chats again with the final response
            setChats(prevChats => 
                prevChats.map(chat => 
                    chat.id === updatedChat.id ? updatedChat : chat
                )
            );
    
            return updatedChat;
        });
        
    }

    const contextValue = {
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
        setInput,
        newChat,
        currChat,
        setCurrChat,
        chats,
        setChats,
        loadChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;