import { Check, X } from "lucide-react";
import type { FriendRequestProps } from "../../types";

const FriendRequest = ({requestSenderData} : FriendRequestProps) => {
    return <div className="card">
                <div className="image-holder" style={{backgroundImage: `url(${requestSenderData.profilePicture})`}}/>
                <p className="username">{requestSenderData.username}</p>
                <div className="control-buttons">
                    <button id="accept"> <Check fontSize={15}/> </button>
                    <button id="decline"> <X fontSize={15}/> </button>
                </div>
            </div>
}

export default FriendRequest; 