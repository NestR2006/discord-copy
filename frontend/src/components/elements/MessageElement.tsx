import { Pencil, Smile, Trash2 } from "lucide-react";
import { useState } from "react"

interface MessageElementProps {
    message: string,
    username: string,
    imageLink: string,
    // onDeleteMessage: () => {}
    // onChangeMessage: () => {}
}

//onDeleteMessage, onChangeMessage

const MessageELement = ({ message, username, imageLink }: MessageElementProps) => {
    const [showPDPDPD, setState] = useState(false);

    const avatarStyle = imageLink
        ? { backgroundImage: `url("${imageLink}")` }
        : { backgroundImage: "none" };



    return <div className="message-block" onMouseEnter={() => { setState(true) }} onMouseLeave={() => { setState(false) }}>
        <div className="image-holder" style={avatarStyle} />
        <div className="layout">
            <p className="user-name">{username}</p>
            <p className="message">{message}</p>
        </div>
        {showPDPDPD ?
            <div className="more-options">
                <button className="additional-actions">
                    <Trash2 fontSize={13} color="white" />
                </button>
                <button className="additional-actions">
                    <Pencil fontSize={13} color="white" />
                </button>
                <button className="additional-actions">
                    <Smile fontSize={13} color="white" />
                </button>
            </div>
            :
            <h1></h1>
        }
    </div>
}

export default MessageELement;