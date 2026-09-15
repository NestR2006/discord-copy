import FriendRequest from "../elements/FriendRequest";
import type { requestData } from "../../types";

interface FriendsRequestsProps{
    requests: requestData[];
    onAccept: (senderUsername : string) => void;
    onDecline: (senderUsername : string) => void;
}

const FriendsRequests = ({requests, onAccept, onDecline} : FriendsRequestsProps) => {

    return <div className="friends-requests-list">
        <h2>Запросы на добавление в друзья</h2>
        <ul>
            <li>
                {requests.map((request) => {
                    return <FriendRequest requestSenderData={{username: request.username, profilePicture: request.profilePicture}} onAccept={onAccept} onDecline={onDecline}/>
                })}
            </li>
        </ul>
    </div>
}

export default FriendsRequests;