import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
// import ReactMarkdown from 'react-markdown';


const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)
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
                <div className="card">
                    <p>Help me debug my code.</p>
                    <img src={assets.code_icon} alt="code" />
                </div>
                <div className="card">
                    <p>Plan a healthy weekly meal prep.</p>
                    <img src={assets.health_icon} alt="health" />
                </div>
                <div className="card">
                    <p>Travel ideas for a weekend getaway.</p>
                    <img src={assets.travel_icon} alt="travel" />
                </div>
                <div className="card">
                    <p>Give me a quick summary of this article.</p>
                    <img src={assets.summary_icon} alt="summary" />
                </div>
            </div>
            </>
            : <div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-response">
                    <img src={assets.gemini_icon} alt="" className={loading ? "spinning-logo" : ""}/>
                    {!loading ? (
                        <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                        // <ReactMarkdown>{resultData}</ReactMarkdown>
                    ) : <p>Just a sec...</p>}
                </div>
            </div>
            }

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt="gallery" />
                        <img onClick={() => onSent()} src={assets.send_icon} alt="send" />
                    </div>
                </div>
                <p className="bottom-info">AI can make mistakes. Check important info.</p>
            </div>
        </div>
    </div>
    )
}

export default Main