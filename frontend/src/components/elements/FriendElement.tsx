import { useState } from "react";
import "../../styles/friendElement.css"

import { MessageCircle, MoreVertical  } from "lucide-react";

interface FriendElementProps{
    username: string;
    profilePictureLink: string;
}

const FriendElement = ({username, profilePictureLink} : FriendElementProps) => {
    const[isMoreOptionsActive, setMoreOptionsState] = useState(false);
    
    return <div className="friend-element">
        <div className="image-holder" style={{backgroundImage: `url(${profilePictureLink})`}}/>
        <p className="username">{username}</p>
        <div className="buttons">
            <button className="chat-button">
                <MessageCircle fontSize={14}/>
            </button>
            <div className="more-options-wrapper">
                <button className="more-options" 
                        onClick={() => setMoreOptionsState(true)}>
                    <MoreVertical fontSize={14} />
                </button>

                {isMoreOptionsActive ? (
                    <div className="more-options-container"
                         onMouseEnter={() => {setMoreOptionsState(false)}}>
                        <button>Начать видеозвонок</button>
                        <button>Начать голосовой звонок</button>
                        <button>Удалить из друзей</button>
                    </div>
                ) : null}   
            </div>
        </div>
    </div>
}

export default FriendElement;