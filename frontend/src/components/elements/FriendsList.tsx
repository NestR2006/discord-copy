import { Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query";
import type { FriendInterface } from "../../types";
import FriendElement from "./FriendElement";

import "../../styles/friendsList.css"

const FriendsList = () => {
    const { data: friends } = useQuery({
        queryKey: ["friends"],
        queryFn: async () => {
            const response = await fetch("/contacts/", { credentials: "include" });
            if (!response.ok) throw new Error("Failed to fetch friends");
            const data = await response.json();
            return data.friends;
        }
    });

    return <>
        <div className="friends-list">
            <Search fontSize={12} className="search-icon"/>
            <input type="text" placeholder="Поиск" />
            <ul className="friends">
                {friends?.map((friend : FriendInterface) => {
                    return <li><FriendElement username={friend.username} profilePictureLink={friend.profilePicture}/></li>
                })}
            </ul>
        </div>
        <div className="active-users-list">
            <h2>Активные контакты</h2>
        </div>
    </>
}

export default FriendsList;