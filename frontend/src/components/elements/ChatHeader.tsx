import { Phone, Video, Pin, UserPlus, Users } from "lucide-react";

interface chatHeaderProps {
    nickName : string, 
    profilePicture : string
}

const СhatHeader = ({nickName, profilePicture} : chatHeaderProps) => {
    return (
    <section className="chat-header">
        <div className="image-holder" style={{backgroundImage: `url(${profilePicture})`}}/>
        <div className="label">{nickName}</div>
        <div className="control-buttons-and-search">
            <Phone size={20} className="control-button"/> 
            <Video size={20} className="control-button"/> 
            <Pin size={20} className="control-button"/>     
            <UserPlus size={20} className="control-button"/> 
            <Users size={20} className="control-button"/>
            <input type="text" placeholder={`Искать "${nickName}"`} className="search-field"/>  
        </div>
    </section>)
}

export default СhatHeader;