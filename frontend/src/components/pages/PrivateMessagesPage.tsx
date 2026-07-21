import { Outlet } from "react-router"
import PrivateMessagesSidebar from "../sidebars/PrivateChatsSidebar"

const PrivateMessagesPage = () => {

    const changeChatHandler = (chatID: number) => {
        chatID;
    }

    return (<>
        <PrivateMessagesSidebar onActiveChatChanged={changeChatHandler}/>
        <div className="content-container">
            <Outlet />
        </div>
    </>)
}

export default PrivateMessagesPage;