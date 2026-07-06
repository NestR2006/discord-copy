import "../../styles/chatElement.css"

import type { ChatElementProps } from "../../types";

const ChatElement = ({image, className} : ChatElementProps) => {
    return <div className={`chat-element ${className ?? ""}`}>
        <div className="image-holder" style={{backgroundImage: `url(${image})`}} />
    </div>
}

export default ChatElement;