import React, {useState} from 'react'
import { assets } from '../../assets/assets'
import './Sidebar.css'

const Sidebar = () => {

    const [extended, setExtension] = useState(true);

    function handleClick() {
        setExtension(!extended)
    }
  return (
    <div className="sidebar">
        <div className="top">
            <img className='menu' src={assets.menu_icon} alt="menu" onClick={() => handleClick()}/>
            <div className="new-chat">
                <img src={assets.add_icon} alt="new chat" />
                {extended?<p>New Chat</p>:null}
            </div>
            {extended?<div className="recent">
                <p className="recent-title">Recent</p>
                <div className="recent-entry">
                    {/* change */}
                    <img src={assets.chat_icon} alt="" />
                    <p>placeholder</p>
                </div>
            </div>:null}
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.help_icon} alt="help" />
                {extended?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.activity_icon} alt="activity" />
                {extended?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="setting" />
                {extended?<p>Setting</p>:null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar