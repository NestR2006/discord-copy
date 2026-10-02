import { Phone, Video, Pin, UserPlus, Users, X } from "lucide-react";
import { useState } from "react";

interface chatHeaderProps {
    username: string,
    profilePicture: string,
    onSearchMessage: (argument: string) => void,
    onCloseSearch: () => void,
    onShowUserMiniprofile: (username: string) => void,
}

const СhatHeader = ({ username, profilePicture, onSearchMessage, onCloseSearch, onShowUserMiniprofile }: chatHeaderProps) => {
    const [messageSearchState, setSearchState] = useState(false);

    const avatarStyle = profilePicture
        ? { backgroundImage: `url("${profilePicture}")` }
        : { backgroundImage: "none" };

    const searchMessageHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            e.preventDefault();
            setSearchState(true);
            onSearchMessage(e.currentTarget.value);
        }
    }

    return (
        <section className="chat-header">
            <div className="image-holder" style={avatarStyle} />
            <div className="label" onClick={() => { onShowUserMiniprofile(username); }}>{username}</div>
            <div className="control-buttons-and-search">
                <Phone size={20} className="control-button" />
                <Video size={20} className="control-button" />
                <Pin size={20} className="control-button" />
                <UserPlus size={20} className="control-button" />
                <Users size={20} className="control-button" />
                <input type="text" placeholder={`Искать "${username}"`} className="search-field" onKeyDown={searchMessageHandler} />
                {messageSearchState ?
                    <button className="close-search"
                        onClick={() => {
                            setSearchState(false);
                            onCloseSearch();
                        }}>
                        <X fontSize={4} />
                    </button>
                    :
                    null
                }
            </div>
        </section>)
}

export default СhatHeader;