import { useState } from "react";

interface MessageElementProps {
    message: string,
    username: string,
    imageLink: string,
    id: number,
    isChanged: number,
}

const MessageSearchResultElement = ({ message, username, imageLink, id, isChanged }: MessageElementProps) => {
    const [showMoreOptions, setState] = useState(false);

    console.log(id);

    const avatarStyle = imageLink
        ? { backgroundImage: `url("${imageLink}")` }
        : { backgroundImage: "none" };

    return <div className="search-result-message-block" onMouseEnter={() => { setState(true) }} onMouseLeave={() => { setState(false) }}>
        <div className="image-holder" style={avatarStyle} />
        <div className="layout">
            <p className="user-name">{username}</p>
            <div className="message-layout">
                <p className="message">{message}</p>
                {isChanged ? <h6 className="message-changed-state">(Message is changed)</h6> : null}
            </div>
        </div>
        {showMoreOptions ?
            <div className="more-options">
            </div>
            :
            <></>
        }
    </div>
}

export default MessageSearchResultElement;