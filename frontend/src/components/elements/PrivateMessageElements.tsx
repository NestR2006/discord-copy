import "../../styles/privateMessageElement.css"

import type { PrivateMessageElementProps, ChatProps } from "../../types";


export const mockPrivateMessages: ChatProps[] = [
    { id: 1, nickName: "Alex_Dev", profilePicture: "https://i.pravatar.cc/150?img=1" },
    { id: 2, nickName: "Marina_UI", profilePicture: "https://i.pravatar.cc/150?img=2" },
    { id: 3, nickName: "shadowByte", profilePicture: "https://i.pravatar.cc/150?img=3" },
    { id: 4, nickName: "Kate99", profilePicture: "https://i.pravatar.cc/150?img=4" },
    { id: 5, nickName: "nullPointer", profilePicture: "https://i.pravatar.cc/150?img=5" },
    { id: 6, nickName: "DarkMatter", profilePicture: "https://i.pravatar.cc/150?img=6" },
    { id: 7, nickName: "Vika_Front", profilePicture: "https://i.pravatar.cc/150?img=7" },
    { id: 8, nickName: "byteMe", profilePicture: "https://i.pravatar.cc/150?img=8" },
    { id: 9, nickName: "Oleg_Backend", profilePicture: "https://i.pravatar.cc/150?img=9" },
    { id: 10, nickName: "GhostRider", profilePicture: "https://i.pravatar.cc/150?img=10" },
    { id: 11, nickName: "Nastya_QA", profilePicture: "https://i.pravatar.cc/150?img=11" },
    { id: 12, nickName: "cryptoKnight", profilePicture: "https://i.pravatar.cc/150?img=12" },
    { id: 13, nickName: "Sergey_DevOps", profilePicture: "https://i.pravatar.cc/150?img=13" },
    { id: 14, nickName: "pixelPusher", profilePicture: "https://i.pravatar.cc/150?img=14" },
    { id: 15, nickName: "Lena_Design", profilePicture: "https://i.pravatar.cc/150?img=15" },
    { id: 16, nickName: "voidWalker", profilePicture: "https://i.pravatar.cc/150?img=16" },
    { id: 17, nickName: "Dima_Mobile", profilePicture: "https://i.pravatar.cc/150?img=17" },
    { id: 18, nickName: "syntaxError", profilePicture: "https://i.pravatar.cc/150?img=18" },
    { id: 19, nickName: "Katya_ML", profilePicture: "https://i.pravatar.cc/150?img=19" },
    { id: 20, nickName: "binaryBeast", profilePicture: "https://i.pravatar.cc/150?img=20" },
    { id: 21, nickName: "Pavel_SRE", profilePicture: "https://i.pravatar.cc/150?img=21" },
    { id: 22, nickName: "quantumFox", profilePicture: "https://i.pravatar.cc/150?img=22" },
    { id: 23, nickName: "Irina_PM", profilePicture: "https://i.pravatar.cc/150?img=23" },
    { id: 24, nickName: "stackOverflowed", profilePicture: "https://i.pravatar.cc/150?img=24" },
    { id: 25, nickName: "Anton_Fullstack", profilePicture: "https://i.pravatar.cc/150?img=25" },
    { id: 26, nickName: "nightOwl", profilePicture: "https://i.pravatar.cc/150?img=26" },
    { id: 27, nickName: "Yulia_Data", profilePicture: "https://i.pravatar.cc/150?img=27" },
    { id: 28, nickName: "kernelPanic", profilePicture: "https://i.pravatar.cc/150?img=28" },
    { id: 29, nickName: "Roman_Cloud", profilePicture: "https://i.pravatar.cc/150?img=29" },
    { id: 30, nickName: "silentCoder", profilePicture: "https://i.pravatar.cc/150?img=30" },
];

const PrivateMessageElement = ({nickName, profilePicture, id, onChatSelected, isActive} : PrivateMessageElementProps) => {
    return <div className={`pm-element ${isActive ? "active-chat" : ""}`} onClick={() => onChatSelected(id)}>
        <div className="image-holder" style={{backgroundImage: `url(${profilePicture})`}} />
        <div className="nick-name">{nickName}</div>
    </div>
}

export default PrivateMessageElement;