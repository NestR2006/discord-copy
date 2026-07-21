interface MessageElementProps {
    message: string,
    username: string,
    imageLink: string
}

const MessageELement = ({message, username, imageLink} : MessageElementProps) => {
    return <div className="message-block">
        <div className="image-holder" style={{backgroundImage: `${imageLink}`}}/>
        <div className="layout">
            <p className="user-name">{username}</p>
            <p className="message">{message}</p>
        </div>
    </div>
}

export default MessageELement;