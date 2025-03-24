import { createContext, use, useState } from "react";
import run from "../config/gemini";
import { v4 as uuidv4 } from 'uuid';


export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]); // {id, title, chatHistory: chatHistory}
    const [currChat, setCurrChat] = useState(null);

    const loadChat = (id) => {
        let newChat = chats.find(c => c.id === id);
        setCurrChat(newChat);
        setLoading(false);
        setShowResult(true);
    }

    const newChat = () => {
        setCurrChat(null);
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
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

        let formattedResponse = response
            .replace(/\*\*\s*(.*?)\s*\*\*/g, '<b>$1</b>') // bold text
            .replace(/\*\s(.*?):/g, '<li><b>$1:</b>') // List item start
            .replace(/\*\s(.*?)/g, '<li>$1') // List item start without bold
            .replace(/\n\n/g, '</ul><br>') // end of list
            .replace(/\n\*/g, '<ul>') // start of list
            .replace(/\n/g, '<br>'); // newline

        setLoading(false);

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
        showResult,
        setShowResult,
        loading,
        setLoading,
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