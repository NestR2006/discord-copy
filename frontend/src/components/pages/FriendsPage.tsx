import { Link, Outlet } from "react-router-dom";
import "../../styles/friends-page.css"
import { Users, MessageSquarePlus, UserPlus } from "lucide-react";
import { useState } from "react";

interface FriendsPageProps {
    friendsRequestsAvailable: boolean;
}

const FriendsPage = ({friendsRequestsAvailable} : FriendsPageProps) => {
    const [activeButton, setActiveButton] = useState(0)

    return <div className="friends-page">
        <header className="header">
            <div className="title">
                <Users fontSize={16} color="white"/>
                <p>Друзья</p>
            </div>
            <div className="buttons">
                <Link to={"/contacts/friends"}>
                    <button className={`control-button ` + (activeButton == 1 ? "active" : "")} 
                            onClick={() => {setActiveButton(1)}}>
                                В сети
                    </button>
                    <button className={`control-button ` + (activeButton == 2 ? "active" : "")} 
                            onClick={() => {setActiveButton(2)}}>
                        Все
                    </button>
                </Link>
                <Link to={"/contacts/friends/add-friend"}>
                    <button id="add-friend">Добавить в друзья</button>
                </Link>
                {friendsRequestsAvailable ? 
                <Link to="/contacts/friends/friends-requests">
                    <button id="friend-requests"><UserPlus fontSize={16}/></button>
                </Link> 
                : 
                null}
            </div>
            <button id="start-conversation"> <MessageSquarePlus size={16} /></button>
        </header>
        <section id="body">
            <Outlet />
        </section>
    </div>
}

export default FriendsPage;