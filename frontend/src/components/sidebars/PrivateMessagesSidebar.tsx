import { Users, Gem, ShoppingBag, ClipboardList } from "lucide-react";
import { mockPrivateMessages } from "../elements/PrivateMessageElements";
import PrivateMessageElement from "../elements/PrivateMessageElements";
import type { PrivateMessageElementProps } from "../../types";
import "../../styles/pm-sidebar.css";

const PrivateMessagesSidebar = () => {
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
                {mockPrivateMessages.map((message: PrivateMessageElementProps) => (
                    <PrivateMessageElement
                        key={message.nickName}
                        nickName={message.nickName}
                        profilePicture={message.profilePicture}
                    />
                ))}
            </ul>
        </section>
    );
};

export default PrivateMessagesSidebar;