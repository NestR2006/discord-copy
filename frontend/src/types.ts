export interface ChatElementProps {
    image: string,
    className: string,
    onCLick: (ChatID: number) => void,
    id: number,
}

export interface PrivateMessageElementProps {
    id: number;
    nickName: string;
    profilePicture: string;
    onChatSelected: (chatID: number) => void;
    isActive: boolean;
}

export interface ChatProps {
    id: number;
    nickName: string;
    profilePicture: string;
}

export interface MessageStructure {
    username: string,
    profilePicture: string,
    message: string
}

export interface RegistrationFormBody{
    username: string
    email: string
    password: string
}

export interface FriendInterface {
    username: string,
    profilePicture: string,
}

export interface FriendsListInterface{
    friends: FriendInterface[]
}

export interface requestData {
    profilePicture: string;
    username: string;
}

export interface FriendRequestProps {
    requestSenderData: requestData
}