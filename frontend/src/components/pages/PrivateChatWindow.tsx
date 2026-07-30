import "../../styles/privateChat.css"

import { Plus, Gift, Sticker, Smile, Grid3x3 } from "lucide-react";

import ChatHeader from "../elements/ChatHeader";
import MessageELement from "../elements/MessageElement";

import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { mockPrivateMessages } from "../elements/PrivateMessageElements"; //pm mock for test

import type { MessageStructure } from "../../types";

interface PrivateChatWindowProps {
    userID: number,
    onMessageSended: (userID: number, newMessage: MessageStructure) => void,
    messages: MessageStructure[],
    username: string
}

const PrivateChatWindow = ({userID, onMessageSended, messages, username} : PrivateChatWindowProps) => {
    const [text, setText] = useState("");
    const { chatId } = useParams();
    userID = Number(chatId);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const TextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);

        const el = textAreaRef.current;
        const parent = parentRef.current;
        if (el && parent) {
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
            parent.style.height = "auto"
        }
    }
    
    const sendMessageHandler = () => {
        const value = textAreaRef.current?.value.trim();
        if(value){
            onMessageSended(userID, {username , profilePicture: userInfo!.profilePicture, message: textAreaRef.current!.value});
            setText("");
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "auto";
            }
        }
    }

    const userInfo = mockPrivateMessages!.at(userID > 0 ? userID - 1 : 0);

    if(userID == -1){
        return <section className="private-chat">
                    <h2 className="default-title">Start new conversation</h2>
               </section> 
    }

    return <section className="private-chat">
        <ChatHeader nickName={userInfo!.nickName} profilePicture={userInfo!.profilePicture}/>
        <div className="messages-container">
            {messages?.map((message) => {
                return <MessageELement username={message.username} message={message.message} imageLink={message.profilePicture} />
            })}
        </div>
        <div className="message-input-field" ref={parentRef}>
            <Plus fontSize={18} className="input-field-button" />
            <textarea rows={1} placeholder={`Написать ${userID}`} ref={textAreaRef} className="message-textarea" value={text} onChange={TextAreaHandler} onKeyDown={(e) => {
                                                                                                                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                                                                                                                                e.preventDefault();
                                                                                                                                                                sendMessageHandler();
                                                                                                                                                    }
            }}/>
            <Gift fontSize={18} className="input-field-button" />
            <Sticker fontSize={18} className="input-field-button" />
            <Smile fontSize={18} className="input-field-button" />
            <Grid3x3 fontSize={18} className="input-field-button" />
        </div>
    </section>
}

export default PrivateChatWindow;