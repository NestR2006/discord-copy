import { Pencil, Smile, Trash2 } from "lucide-react";
import { useState } from "react"

interface MessageElementProps {
    message: string,
    username: string,
    imageLink: string,
    id: number,
    isChanged: number,
    onDeleteMessage: (messageID: number) => void,
    onChangeMessage: (messageID: number, newMessage: string) => void,
}

//onDeleteMessage, onChangeMessage

const MessageELement = ({ message, username, imageLink, id, isChanged, onDeleteMessage, onChangeMessage }: MessageElementProps) => {
    const [showMoreOptions, setState] = useState(false);
    const [changeMessage, setChangeMessageState] = useState(false);
    const [fieldValue, setValue] = useState(message);
    const [messageIsChanged, setChangedState] = useState(false);

    const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const changeMessageHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            e.preventDefault();
            if (message != fieldValue) {
                onChangeMessage(id, fieldValue)
                setChangedState(true);
            }

            setChangeMessageState(false);
        }
    }

    const avatarStyle = imageLink
        ? { backgroundImage: `url("${imageLink}")` }
        : { backgroundImage: "none" };

    return <div className={"message-block " + (changeMessage ? "active" : "")}
        onMouseEnter={() => { setState(true) }} onMouseLeave={() => { setState(false) }}>
        <div className="image-holder" style={avatarStyle} />
        <div className="layout">
            <p className="user-name">{username}</p>
            {changeMessage ?
                <input type="text" value={fieldValue} className="change-message-field" onChange={changeValueHandler} onKeyDown={changeMessageHandler}></input> :
                <div className="message-layout">
                    <p className="message">{fieldValue}</p>
                    {messageIsChanged || isChanged ? <h6 className="message-changed-state">(Message is changed)</h6> : null}
                </div>}
        </div>
        {showMoreOptions && !changeMessage ?
            <div className="more-options">
                <button className="additional-actions" onClick={() => { onDeleteMessage(id) }}>
                    <Trash2 fontSize={13} color="white" />
                </button>
                <button className="additional-actions" onClick={() => { setChangeMessageState(true); }}>
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