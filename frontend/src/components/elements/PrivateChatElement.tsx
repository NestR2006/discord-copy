import "../../styles/privateMessageElement.css"

import type { PrivateMessageElementProps } from "../../types";

const PrivateChatElement = ({ username, profilePicture, id, onChatSelected, isActive }: PrivateMessageElementProps) => {
    return <div className={`pm-element ${isActive ? "active-chat" : ""}`} onClick={() => onChatSelected(id)}>
        <div className="image-holder" style={{ backgroundImage: `url(${profilePicture})` }} />
        <div className="nick-name">{username}</div>
    </div>
}

export default PrivateChatElement;