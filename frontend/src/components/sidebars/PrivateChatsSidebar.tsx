import { Users, Gem, ShoppingBag, ClipboardList } from "lucide-react";
import { mockPrivateMessages } from "../elements/PrivateMessageElements";
import PrivateMessageElement from "../elements/PrivateMessageElements";
import type { ChatProps } from "../../types";
import "../../styles/pm-sidebar.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface PrivateMessagesSidebarProps {
    onActiveChatChanged: (chatID : number) => void
}

const PrivateMessagesSidebar = ({onActiveChatChanged} : PrivateMessagesSidebarProps) => {
    const [activeButton, setChat] = useState<number>(0);
    // const [chats, setChats] = useState([]);

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
                <Link to={"/contacts/friends"}>
                    <button className={`control-buttons ` + (activeButton == -1 ? "active" : "")} 
                            onClick={() => {setChat(-1)}}>
                        <Users size={18} />
                        Друзья
                    </button>
                </Link>
                <button className={`control-buttons ` + (activeButton == -2 ? "active" : "")} 
                        onClick={() => {setChat(-2)}}>
                    <Gem size={18} />
                    Nitro
                </button>
                <button className={`control-buttons ` + (activeButton == -3 ? "active" : "")} 
                    onClick={() => {setChat(-3)}}>
                    <ShoppingBag size={18} />
                    Магазин
                </button>
                <button className={`control-buttons last-button ` + (activeButton == -4 ? "active" : "")} 
                        onClick={() => {setChat(-4)}}>
                    <ClipboardList size={18} />
                    Задания
                </button>
                {mockPrivateMessages.map((chat: ChatProps) => (
                    <Link to={`/contacts/${chat.id}`}>
                        <PrivateMessageElement
                        key={chat.id}
                        nickName={chat.nickName}
                        profilePicture={chat.profilePicture}
                        id={chat.id}
                        isActive={activeButton === chat.id}
                        onChatSelected={activeChatHandler}
                    />
                    </Link>
                ))}
            </ul>
        </section>
    );
};

export default PrivateMessagesSidebar;