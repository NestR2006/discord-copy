import { Outlet } from "react-router"
import PrivateMessagesSidebar from "../sidebars/PrivateChatsSidebar"

import "../../styles/privateMessagesPage.css"

const PrivateMessagesPage = () => {

    const changeChatHandler = (chatID: number) => {
        chatID;
    }

    return (<div id="private-messages-page">
        <PrivateMessagesSidebar onActiveChatChanged={changeChatHandler}/>
        <Outlet />
    </div>)
}

export default PrivateMessagesPage;