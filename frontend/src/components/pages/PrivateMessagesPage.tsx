import { Outlet } from "react-router"
import PrivateMessagesSidebar from "../sidebars/PrivateChatsSidebar"
import type { PrivateChatProps } from "../../types"

import "../../styles/privateMessagesPage.css"

interface PrivateMessagesProps {
    privateChats: PrivateChatProps[]
}

const PrivateMessagesPage = ({ privateChats }: PrivateMessagesProps) => {
    return (<div id="private-messages-page">
        <PrivateMessagesSidebar privateChats={privateChats} />
        <Outlet />
    </div>)
}

export default PrivateMessagesPage;