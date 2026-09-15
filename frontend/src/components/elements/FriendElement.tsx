import { useNavigate } from "react-router-dom";
import "../../styles/friendElement.css"

import { MessageCircle, MoreVertical  } from "lucide-react";

interface FriendElementProps{
    username: string;
    profilePictureLink: string;
    onMoreOptionsCLicked: (username: string) => void;
    isMoreOptionsActive: boolean;
}

const FriendElement = ({username, profilePictureLink, onMoreOptionsCLicked, isMoreOptionsActive} : FriendElementProps) => {
    const navigate = useNavigate();

    const onOpenChatHandler = () => {
        navigate(`/contacts/${username}`)
    }

    return <div className="friend-element" onClick={onOpenChatHandler}>
        <div className="image-holder" style={{backgroundImage: `url(${profilePictureLink})`}}/>
        <p className="username">{username}</p>
        <div className="buttons">
            <button className="chat-button" onClick={onOpenChatHandler}>
                <MessageCircle fontSize={14}/>
            </button>
            <div className="more-options-wrapper">
                <button className="more-options" 
                        onClick={() => onMoreOptionsCLicked(username)}>
                    <MoreVertical fontSize={14} />
                </button>

                {isMoreOptionsActive ? (
                    <div className="more-options-container">
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