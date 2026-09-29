import { Phone, Video, Pin, UserPlus, Users } from "lucide-react";

interface chatHeaderProps {
    username : string, 
    profilePicture : string
}

const СhatHeader = ({username, profilePicture} : chatHeaderProps) => {
    const avatarStyle = profilePicture
        ? { backgroundImage: `url("${profilePicture}")` }
        : { backgroundImage: "none" };

    return (
    <section className="chat-header">
        <div className="image-holder" style={avatarStyle}/>
        <div className="label">{username}</div>
        <div className="control-buttons-and-search">
            <Phone size={20} className="control-button"/> 
            <Video size={20} className="control-button"/> 
            <Pin size={20} className="control-button"/>     
            <UserPlus size={20} className="control-button"/> 
            <Users size={20} className="control-button"/>
            <input type="text" placeholder={`Искать "${username}"`} className="search-field"/>  
        </div>
    </section>)
}

export default СhatHeader;