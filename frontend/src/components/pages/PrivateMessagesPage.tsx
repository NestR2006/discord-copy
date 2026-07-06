import { Outlet } from "react-router"
import PrivateMessagesSidebar from "../sidebars/PrivateMessagesSidebar"

const PrivateMessagesPage = () => {
    return (<>
        <PrivateMessagesSidebar/>
        <div className="content-container">
            <Outlet />
        </div>
    </>)
}

export default PrivateMessagesPage;