import "../../styles/privateMessageElement.css"

import type { PrivateMessageElementProps, ChatProps } from "../../types";


export const mockPrivateMessages: ChatProps[] = [
    { id: 1, username: "Alex_Dev", profilePicture: "https://i.pravatar.cc/150?img=1" },
    { id: 2, username: "Marina_UI", profilePicture: "https://i.pravatar.cc/150?img=2" },
    { id: 4, username: "Kate99", profilePicture: "https://i.pravatar.cc/150?img=4" },
    { id: 5, username: "nullPointer", profilePicture: "https://i.pravatar.cc/150?img=5" },
    { id: 3, username: "shadowByte", profilePicture: "https://i.pravatar.cc/150?img=3" },
    { id: 6, username: "DarkMatter", profilePicture: "https://i.pravatar.cc/150?img=6" },
    { id: 7, username: "Vika_Front", profilePicture: "https://i.pravatar.cc/150?img=7" },
    { id: 8, username: "byteMe", profilePicture: "https://i.pravatar.cc/150?img=8" },
    { id: 9, username: "Oleg_Backend", profilePicture: "https://i.pravatar.cc/150?img=9" },
    { id: 10, username: "GhostRider", profilePicture: "https://i.pravatar.cc/150?img=10" },
    { id: 11, username: "Nastya_QA", profilePicture: "https://i.pravatar.cc/150?img=11" },
    { id: 12, username: "cryptoKnight", profilePicture: "https://i.pravatar.cc/150?img=12" },
    { id: 13, username: "Sergey_DevOps", profilePicture: "https://i.pravatar.cc/150?img=13" },
    { id: 14, username: "pixelPusher", profilePicture: "https://i.pravatar.cc/150?img=14" },
    { id: 15, username: "Lena_Design", profilePicture: "https://i.pravatar.cc/150?img=15" },
    { id: 16, username: "voidWalker", profilePicture: "https://i.pravatar.cc/150?img=16" },
    { id: 17, username: "Dima_Mobile", profilePicture: "https://i.pravatar.cc/150?img=17" },
    { id: 18, username: "syntaxError", profilePicture: "https://i.pravatar.cc/150?img=18" },
    { id: 19, username: "Katya_ML", profilePicture: "https://i.pravatar.cc/150?img=19" },
    { id: 20, username: "binaryBeast", profilePicture: "https://i.pravatar.cc/150?img=20" },
    { id: 21, username: "Pavel_SRE", profilePicture: "https://i.pravatar.cc/150?img=21" },
    { id: 22, username: "quantumFox", profilePicture: "https://i.pravatar.cc/150?img=22" },
    { id: 23, username: "Irina_PM", profilePicture: "https://i.pravatar.cc/150?img=23" },
    { id: 24, username: "stackOverflowed", profilePicture: "https://i.pravatar.cc/150?img=24" },
    { id: 25, username: "Anton_Fullstack", profilePicture: "https://i.pravatar.cc/150?img=25" },
    { id: 26, username: "nightOwl", profilePicture: "https://i.pravatar.cc/150?img=26" },
    { id: 27, username: "Yulia_Data", profilePicture: "https://i.pravatar.cc/150?img=27" },
    { id: 28, username: "kernelPanic", profilePicture: "https://i.pravatar.cc/150?img=28" },
    { id: 29, username: "Roman_Cloud", profilePicture: "https://i.pravatar.cc/150?img=29" },
    { id: 30, username: "silentCoder", profilePicture: "https://i.pravatar.cc/150?img=30" },
];

const PrivateMessageElement = ({username, profilePicture, id, onChatSelected, isActive} : PrivateMessageElementProps) => {
    return <div className={`pm-element ${isActive ? "active-chat" : ""}`} onClick={() => onChatSelected(id)}>
        <div className="image-holder" style={{backgroundImage: `url(${profilePicture})`}} />
        <div className="nick-name">{username}</div>
    </div>
}

export default PrivateMessageElement;