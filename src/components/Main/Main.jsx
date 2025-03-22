import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">
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

            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder='Enter prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className="bottom-info">AI can make mistakes. Check important info.</p>
            </div>
        </div>
    </div>
    )
}

export default Main