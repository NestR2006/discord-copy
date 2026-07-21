import { Users, Gem, ShoppingBag, ClipboardList } from "lucide-react";
// import { mockPrivateMessages } from "../elements/PrivateMessageElements";
import PrivateMessageElement from "../elements/PrivateMessageElements";
import type { ChatProps } from "../../types";
import "../../styles/pm-sidebar.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface PrivateMessagesSidebarProps {
    onActiveChatChanged: (chatID : number) => void
}

const PrivateMessagesSidebar = ({onActiveChatChanged} : PrivateMessagesSidebarProps) => {
    const [activePrivateChatID, setChat] = useState<number>(0);
    // const [chats, setChats] = useState([]);

    const chats : ChatProps[] = [];

    const activeChatHandler = (chatID : number) => {
        setChat(chatID);
        onActiveChatChanged(chatID);
    }

    useQuery({queryKey: ["chats"], queryFn: async () => {
        
    }})

    return (
        <section id="pm-sidebar">
            <button className="new-conversation">Найти или начать беседу</button>
            <ul className="chats-list">
                <button className="control-buttons">
                    <Users size={18} />
                    Друзья
                </button>
                <button className="control-buttons">
                    <Gem size={18} />
                    Nitro
                </button>
                <button className="control-buttons">
                    <ShoppingBag size={18} />
                    Магазин
                </button>
                <button className="control-buttons last-button">
                    <ClipboardList size={18} />
                    Задания
                </button>
                {chats.map((chat: ChatProps) => (
                    <PrivateMessageElement
                        key={chat.id}
                        nickName={chat.nickName}
                        profilePicture={chat.profilePicture}
                        id={chat.id}
                        isActive={activePrivateChatID === chat.id}
                        onChatSelected={activeChatHandler}
                    />
                ))}
            </ul>
        </section>
    );
};

export default PrivateMessagesSidebar;