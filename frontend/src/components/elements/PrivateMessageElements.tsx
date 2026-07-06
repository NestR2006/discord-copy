import "../../styles/privateMessageElement.css"

interface PrivateMessageElementProps {
    nickName: string,
    profilePicture: string,
}

export const mockPrivateMessages: PrivateMessageElementProps[] = [
    { nickName: "Alex_Dev", profilePicture: "https://i.pravatar.cc/150?img=1" },
    { nickName: "Marina_UI", profilePicture: "https://i.pravatar.cc/150?img=2" },
    { nickName: "shadowByte", profilePicture: "https://i.pravatar.cc/150?img=3" },
    { nickName: "Kate99", profilePicture: "https://i.pravatar.cc/150?img=4" },
    { nickName: "nullPointer", profilePicture: "https://i.pravatar.cc/150?img=5" },
    { nickName: "DarkMatter", profilePicture: "https://i.pravatar.cc/150?img=6" },
    { nickName: "Vika_Front", profilePicture: "https://i.pravatar.cc/150?img=7" },
    { nickName: "byteMe", profilePicture: "https://i.pravatar.cc/150?img=8" },
    { nickName: "Oleg_Backend", profilePicture: "https://i.pravatar.cc/150?img=9" },
    { nickName: "GhostRider", profilePicture: "https://i.pravatar.cc/150?img=10" },
    { nickName: "Nastya_QA", profilePicture: "https://i.pravatar.cc/150?img=11" },
    { nickName: "cryptoKnight", profilePicture: "https://i.pravatar.cc/150?img=12" },
    { nickName: "Sergey_DevOps", profilePicture: "https://i.pravatar.cc/150?img=13" },
    { nickName: "pixelPusher", profilePicture: "https://i.pravatar.cc/150?img=14" },
    { nickName: "Lena_Design", profilePicture: "https://i.pravatar.cc/150?img=15" },
    { nickName: "voidWalker", profilePicture: "https://i.pravatar.cc/150?img=16" },
    { nickName: "Dima_Mobile", profilePicture: "https://i.pravatar.cc/150?img=17" },
    { nickName: "syntaxError", profilePicture: "https://i.pravatar.cc/150?img=18" },
    { nickName: "Katya_ML", profilePicture: "https://i.pravatar.cc/150?img=19" },
    { nickName: "binaryBeast", profilePicture: "https://i.pravatar.cc/150?img=20" },
    { nickName: "Pavel_SRE", profilePicture: "https://i.pravatar.cc/150?img=21" },
    { nickName: "quantumFox", profilePicture: "https://i.pravatar.cc/150?img=22" },
    { nickName: "Irina_PM", profilePicture: "https://i.pravatar.cc/150?img=23" },
    { nickName: "stackOverflowed", profilePicture: "https://i.pravatar.cc/150?img=24" },
    { nickName: "Anton_Fullstack", profilePicture: "https://i.pravatar.cc/150?img=25" },
    { nickName: "nightOwl", profilePicture: "https://i.pravatar.cc/150?img=26" },
    { nickName: "Yulia_Data", profilePicture: "https://i.pravatar.cc/150?img=27" },
    { nickName: "kernelPanic", profilePicture: "https://i.pravatar.cc/150?img=28" },
    { nickName: "Roman_Cloud", profilePicture: "https://i.pravatar.cc/150?img=29" },
    { nickName: "silentCoder", profilePicture: "https://i.pravatar.cc/150?img=30" },
];

const PrivateMessageElement = ({nickName, profilePicture} : PrivateMessageElementProps) => {
    return <div className="pm-element">
        <div className="image-holder" style={{backgroundImage: `url(${profilePicture})`}} />
        <div className="nick-name">{nickName}</div>
    </div>
}

export default PrivateMessageElement;