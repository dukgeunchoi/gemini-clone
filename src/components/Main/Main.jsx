import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'


const Main = () => {

    const {onSent, showResult, loading, setInput, input, currChat} = useContext(Context)

    const useSuggestion = (input) => {
        setInput("");
        setInput(input);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && input.trim()) {
            onSent();
        }
      };

    return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">
            {!showResult ? 
            <>
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today?</p>
            </div>

            <div className="cards">
                <div onClick={() => useSuggestion("Help me debug my code.")} className="card">
                    <p>Help me debug my code.</p>
                    <img src={assets.code_icon} alt="code" />
                </div>
                <div onClick={() => useSuggestion("Plan a healthy weekly meal prep.")} className="card">
                    <p>Plan a healthy weekly meal prep.</p>
                    <img src={assets.health_icon} alt="health" />
                </div>
                <div onClick={() => useSuggestion("Travel ideas for a weekend getaway.")} className="card">
                    <p>Travel ideas for a weekend getaway.</p>
                    <img src={assets.travel_icon} alt="travel" />
                </div>
                <div onClick={() => useSuggestion("Give me a quick summary of this article.")} className="card">
                    <p>Give me a quick summary of this article.</p>
                    <img src={assets.summary_icon} alt="summary" />
                </div>
            </div>
            </>
            : 
            <div className='result'>
                {currChat.chatHistory.map((message, index) => {
                    const isLastAiMessage = index === currChat.chatHistory.length - 1 && message.role === "ai";

                    return (<div key={index} className={`chat-message ${message.role}`}>
                        {message.role === "user" ? <>
                            <div className="result-title">
                                <p>{message.text}</p>
                            </div>
                        </> : <>
                            <div className="result-response">
                                <img src={assets.gemini_icon} alt="" className={isLastAiMessage && loading ? "spinning-logo" : ""}/>
                                <p dangerouslySetInnerHTML={{ __html: message.text }}></p>
                            </div>
                        </>
                        }
                    </div>)
                })}
            </div>
            }

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} 
                            value={input} type="text" 
                            placeholder='Ask Gemini'
                            onKeyDown={handleKeyDown}
                            />
                    <div>
                        {input?<><img onClick={() => onSent()} src={assets.send_icon} alt="send" /></>:null}
                    </div>
                </div>
                <p className="bottom-info">AI can make mistakes. Check important info.</p>
            </div>
        </div>
    </div>
    )
}

export default Main