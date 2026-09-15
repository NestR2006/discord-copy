import "../../styles/privateChat.css"

import { Plus, Gift, Sticker, Smile, Grid3x3 } from "lucide-react";

import ChatHeader from "../elements/ChatHeader";
import MessageELement from "../elements/MessageElement";

import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// import { mockPrivateMessages } from "../elements/PrivateMessageElements"; //pm mock for test

import type { SendMessageStructure, Message } from "../../types";

interface PrivateChatWindowProps {
    onMessageSended: (newMessage: SendMessageStructure) => void,
    messages: Record<string, Message[]>,
    username: string
}

const PrivateChatWindow = ({ onMessageSended, messages, username }: PrivateChatWindowProps) => {
    const [text, setText] = useState("");
    const { recieverParamUsername } = useParams();
    const recieverUsername: string = recieverParamUsername!.toString();

    const chatHistory = messages[recieverUsername];

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const { data } = useQuery({
        queryKey: ["chatHistory"],
        queryFn: async () => {
            const response = await fetch(`/chats/chat-history?second_participants=${recieverParamUsername}`, {
                method: "GET",
                credentials: "include",
            })

            const buf = await response.json();
            console.log(buf);
            return await response.json();
        }
    })

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
        if (value) {
            onMessageSended({ senderUsername: username, recieverUsername: recieverUsername!, message: textAreaRef.current!.value });
            setText("");
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "auto";
            }
        }
    }

    return <section className="private-chat">
        <ChatHeader username={recieverUsername!} profilePicture={""} />
        <div className="messages-container">
            {data.chatHistory?.map((message) => {
                return <MessageELement username={message.from} message={message.text} imageLink={""} />
            })}
        </div>
        <div className="message-input-field" ref={parentRef}>
            <Plus fontSize={18} className="input-field-button" />
            <textarea rows={1} placeholder={`Написать ${recieverUsername}`} ref={textAreaRef} className="message-textarea" value={text} onChange={TextAreaHandler} onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessageHandler();
                }
            }} />
            <Gift fontSize={18} className="input-field-button" />
            <Sticker fontSize={18} className="input-field-button" />
            <Smile fontSize={18} className="input-field-button" />
            <Grid3x3 fontSize={18} className="input-field-button" />
        </div>
    </section>
}

export default PrivateChatWindow;