import React, {useContext, useState} from 'react'
import { assets } from '../../assets/assets'
import './Sidebar.css'
import { Context } from '../../context/Context';

const Sidebar = () => {

    const [extended, setExtension] = useState(false);
    const {newChat, chats, loadChat} = useContext(Context);

    function handleClick() {
        setExtension(!extended)
    }
  return (
    <div className="sidebar">
        <div className="top">
            <img className='menu' src={assets.menu_icon} alt="menu" onClick={() => handleClick()}/>
            <div onClick={() => newChat()} 
                onMouseEnter={() => setExtension(true)}
                onMouseLeave={() => extended && setExtension(false)}
                className="new-chat">
                <img src={assets.add_icon} alt="new chat" />
                {extended?<p>New Chat</p>:null}
            </div>
            {extended?<div className="recent">
                <p className="recent-title">Recent</p>
                {chats.map((item,index)=> {
                    return (
                        <div key={index} onClick={()=>loadChat(item.id)} className="recent-entry">
                            <img src={assets.chat_icon} alt="" />
                            {item.title.length > 18 ? <p>{item.title.slice(0,18)} ...</p> : <p>{item.title}</p>}
                        </div>
                    )
                })}
            </div>:null}
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry" >
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