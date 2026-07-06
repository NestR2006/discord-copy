import "../../styles/chatListSidebar.css"

import ChatElement from "../elements/ChatElement"

const chats = [
    {image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXz_uXJ3pWNzndxv4HtU9QZroaxEyo1AkC1iMoUHe6Uw&s=10"}
]

const ChatsListSidebar = () => {
    return (
    <section id="chats-sidebar">
        <ul className="groups-list">
            <li><ChatElement className="discord-button" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbWVAh11FMLtPBMML2fscSPd0pMJWRNj4UINpxWsTWqQ&s"/></li>
            <li><ChatElement className="" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXz_uXJ3pWNzndxv4HtU9QZroaxEyo1AkC1iMoUHe6Uw&s=10"/></li>
            <li><ChatElement className="" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXz_uXJ3pWNzndxv4HtU9QZroaxEyo1AkC1iMoUHe6Uw&s=10"/></li>
            <li><ChatElement className="" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXz_uXJ3pWNzndxv4HtU9QZroaxEyo1AkC1iMoUHe6Uw&s=10"/></li>
        </ul>
    </section>);
}

export default ChatsListSidebar;