import { X, MoreHorizontal, MessageCircle } from "lucide-react";

import "../../styles/UserMiniprofile.css"
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserMiniprofileProps {
    username: string,
    onClose: () => void,
}

const UserMiniprofile = ({ username, onClose }: UserMiniprofileProps) => {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        registrationDate: "",
        bannerColor: "",
        profilePicture: "",
        isUsersFriend: false,
    })

    const { data, isSuccess } = useQuery({
        queryKey: ["additionalUserInformation"],
        queryFn: async () => {
            const response = await fetch(`/users/search-additional-info?username=${username}`);
            const buf = await response.json();
            console.log(buf);
            return buf.information;
        }
    })

    useEffect(() => {
        if (isSuccess) {
            setUserInfo({
                registrationDate: data.registrationDate,
                bannerColor: data.bannerColor,
                profilePicture: data.profilePicture,
                isUsersFriend: false,
            })
        }
        else return;
    }, [data])

    return <div className="miniprofile-background" onClick={onClose}>
        <div className="user-miniprofile" onClick={(e) => e.stopPropagation()}>
            <div className="banner-color" style={{ backgroundColor: `${userInfo.bannerColor}` }} />
            <button className="close-miniprofile" onClick={onClose}>
                <X fontSize={6} />
            </button>
            <div className="image-holder" style={{ backgroundImage: `url(${userInfo.profilePicture})` }} />
            <p className="nickname-label">{username}</p>
            <div className="buttons-label">
                <button className="action" id="add-to-friends">Добавить в друзья</button>
                <button className="action" id="message" onClick={() => {
                    navigate(`/contacts/${username}`)
                    onClose();
                }}>
                    <MessageCircle fontSize={4} />
                </button>
                <button className="action" id="more-options">
                    <MoreHorizontal fontSize={4} />
                </button>
            </div>
            <p className="registration-data">With us from {`${userInfo.registrationDate}`}</p>
        </div>
    </div>
}

export default UserMiniprofile; 