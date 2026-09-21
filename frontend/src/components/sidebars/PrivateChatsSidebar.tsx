import { Users, Gem, ShoppingBag, ClipboardList } from "lucide-react";
// import { mockPrivateMessages } from "../elements/PrivateMessageElements";
import PrivateMessageElement from "../elements/PrivateMessageElements";
// import type { ChatProps } from "../../types";
import "../../styles/pm-sidebar.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import type { PrivateChatProps } from "../../types";

interface PrivateMessagesSidebarProps {
    onActiveChatChanged: (chatID: number) => void,
    privateChats: PrivateChatProps[],
}

const PrivateMessagesSidebar = ({ onActiveChatChanged, privateChats }: PrivateMessagesSidebarProps) => {
    const [activeButton, setChat] = useState<number>(0);

    const activeChatHandler = (chatID: number) => {
        setChat(chatID);
        onActiveChatChanged(chatID);
    }

    useQuery({
        queryKey: ["chats"], queryFn: async () => {

        }
    })

    return (
        <section id="pm-sidebar">
            <button className="new-conversation">Найти или начать беседу</button>
            <ul className="chats-list">
                <Link to={"/contacts/friends"}>
                    <button className={`control-buttons ` + (activeButton == -1 ? "active" : "")}
                        onClick={() => { setChat(-1) }}>
                        <Users size={18} />
                        Друзья
                    </button>
                </Link>
                <button className={`control-buttons ` + (activeButton == -2 ? "active" : "")}
                    onClick={() => { setChat(-2) }}>
                    <Gem size={18} />
                    Nitro
                </button>
                <button className={`control-buttons ` + (activeButton == -3 ? "active" : "")}
                    onClick={() => { setChat(-3) }}>
                    <ShoppingBag size={18} />
                    Магазин
                </button>
                <button className={`control-buttons last-button ` + (activeButton == -4 ? "active" : "")}
                    onClick={() => { setChat(-4) }}>
                    <ClipboardList size={18} />
                    Задания
                </button>
                {privateChats.map((chat) => (
                    <Link to={`/contacts/${chat.username}`}>
                        <PrivateMessageElement
                            key={chat.username}
                            username={chat.username}
                            profilePicture={chat.profilePictureLink}
                            id={1}
                            isActive={activeButton === 1}
                            onChatSelected={activeChatHandler}
                        />
                    </Link>
                ))}
            </ul>
        </section>
    );
};

export default PrivateMessagesSidebar;