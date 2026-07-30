import FriendRequest from "../elements/FriendRequest";
import type { requestData } from "../../types";

interface FriendsRequestsProps{
    requests: requestData[]
}

const FriendsRequests = ({requests} : FriendsRequestsProps) => {
    console.log(requests);

    return <div className="friends-requests-list">
        <h2>Запросы на добавление в друзья</h2>
        <ul>
            <li>
                {requests.map((request) => {
                    return <FriendRequest requestSenderData={{username: request.username, profilePicture: request.profilePicture}}/>
                })}
            </li>
        </ul>
    </div>
}

export default FriendsRequests;