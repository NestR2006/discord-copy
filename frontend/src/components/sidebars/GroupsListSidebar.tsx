import { useState } from "react"
import { Link } from "react-router-dom";
import "../../styles/chatListSidebar.css"

import ChatElement from "../elements/ChatElement"

interface ChatsDBProps {
    id: number;
    image: string;
}


const chats: ChatsDBProps[] = [
    { id: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbWVAh11FMLtPBMML2fscSPd0pMJWRNj4UINpxWsTWqQ&s" },
    { id: 2, image: "https://picsum.photos/seed/group2/100" },
    { id: 3, image: "https://picsum.photos/seed/group3/100" },
    { id: 4, image: "https://picsum.photos/seed/group4/100" },
    { id: 5, image: "https://picsum.photos/seed/group5/100" },
    { id: 6, image: "https://picsum.photos/seed/group6/100" },
    { id: 7, image: "https://picsum.photos/seed/group7/100" },
    { id: 8, image: "https://picsum.photos/seed/group8/100" },
    { id: 9, image: "https://picsum.photos/seed/group9/100" },
    { id: 10, image: "https://picsum.photos/seed/group10/100" },
    { id: 11, image: "https://picsum.photos/seed/group11/100" },
    { id: 12, image: "https://picsum.photos/seed/group12/100" },
    { id: 13, image: "https://picsum.photos/seed/group13/100" },
    { id: 14, image: "https://picsum.photos/seed/group14/100" },
    { id: 15, image: "https://picsum.photos/seed/group15/100" },
    { id: 16, image: "https://picsum.photos/seed/group16/100" },
    { id: 17, image: "https://picsum.photos/seed/group17/100" },
    { id: 18, image: "https://picsum.photos/seed/group18/100" },
    { id: 19, image: "https://picsum.photos/seed/group19/100" },
    { id: 20, image: "https://picsum.photos/seed/group20/100" },
];

const ChatsListSidebar = () => {
    const [activeChatId, setActiveChat] = useState<number>(1);
    return (
    <section id="chats-sidebar">
        <ul className="groups-list">
            {chats.map((chat : ChatsDBProps) => {
                return <li>
                        <Link to={chat.id == 1 ? "/contacts" : `/group-chats/${chat.id}`}>
                            <ChatElement className={`${chat.id === 1 ? "discord-button" : ""} ${chat.id === activeChatId ? "active-group" : ""}`} id = {chat.id} image={chat.image} onCLick={(chatId: number) => setActiveChat(chatId)}/>
                        </Link>
                       </li>
            })}
            <button className="add-group">+</button>
        </ul>
    </section>);
}

export default ChatsListSidebar;