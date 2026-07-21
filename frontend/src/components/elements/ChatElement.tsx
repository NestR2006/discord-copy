import "../../styles/chatElement.css"

import type { ChatElementProps } from "../../types";

const ChatElement = ({image, className, onCLick, id} : ChatElementProps) => {
    return <div className={`chat-element ${className ?? ""}`} onClick={() => onCLick(id)}>
        <div className="image-holder" style={{backgroundImage: `url(${image})`}} />
    </div>
}

export default ChatElement;