import { Users, Gem, ShoppingBag, ClipboardList } from "lucide-react";
// import { mockPrivateMessages } from "../elements/PrivateMessageElements";
import PrivateChatElement from "../elements/PrivateChatElement";
// import type { ChatProps } from "../../types";
import "../../styles/pm-sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { PrivateChatProps } from "../../types";

interface PrivateMessagesSidebarProps {
    privateChats: PrivateChatProps[],
}

const PrivateMessagesSidebar = ({ privateChats }: PrivateMessagesSidebarProps) => {
    const [activeButton, setChat] = useState<string>("");

    const activeChatHandler = (chatID: string) => {
        setChat(chatID);
    }

    return (
        <section id="pm-sidebar">
            <button className="new-conversation">Найти или начать беседу</button>
            <ul className="chats-list">
                <Link to={"/contacts/friends"}>
                    <button className={`control-buttons ` + (activeButton == "Friends" ? "active" : "")}
                        onClick={() => { setChat("Friends") }}>
                        <Users size={18} />
                        Друзья
                    </button>
                </Link>
                <button className={`control-buttons ` + (activeButton == "Nitro" ? "active" : "")}
                    onClick={() => { setChat("Nitro") }}>
                    <Gem size={18} />
                    Nitro
                </button>
                <button className={`control-buttons ` + (activeButton == "Shop" ? "active" : "")}
                    onClick={() => { setChat("Shop") }}>
                    <ShoppingBag size={18} />
                    Магазин
                </button>
                <button className={`control-buttons last-button ` + (activeButton == "Challenges" ? "active" : "")}
                    onClick={() => { setChat("Challenges") }}>
                    <ClipboardList size={18} />
                    Задания
                </button>
                {privateChats.map((chat) => (
                    <Link to={`/contacts/${chat.username}`}>
                        <PrivateChatElement
                            key={chat.username}
                            username={chat.username}
                            profilePicture={chat.profilePictureLink}
                            id={1}
                            isActive={activeButton === chat.username}
                            onChatSelected={() => { activeChatHandler(chat.username) }}
                        />
                    </Link>
                ))}
            </ul>
        </section>
    );
};

export default PrivateMessagesSidebar;