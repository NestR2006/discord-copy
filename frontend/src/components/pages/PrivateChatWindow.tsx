import "../../styles/privateChat.css"

import { Plus, Gift, Sticker, Smile, Grid3x3 } from "lucide-react";

import ChatHeader from "../elements/ChatHeader";
import MessageELement from "../elements/MessageElement";

import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import type { Message } from "../../types";

interface PrivateChatWindowProps {
    username: string
}

const PrivateChatWindow = ({ username }: PrivateChatWindowProps) => {
    const [text, setText] = useState("");
    const { recieverParamUsername } = useParams();
    const [privateChatMessages, setPrivateChatMessages] = useState<Message[]>([]);

    const recieverUsername: string = recieverParamUsername!.toString();

    useEffect(() => {
        setPrivateChatMessages([]);
    }, [recieverUsername]);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const { data, isSuccess } = useQuery({
        queryKey: ["chatHistory", recieverUsername],
        queryFn: async () => {
            const response = await fetch(`/chats/chat-history?second_participants=${recieverParamUsername}`, {
                method: "GET",
                credentials: "include",
            })

            return await response.json();
        }
    })

    useEffect(() => {
        if (isSuccess) {
            setPrivateChatMessages(data.chatHistory);
        }
    }, [isSuccess, data]);

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

    const sendMessageHandler = async () => {
        const message = textAreaRef.current?.value.trim();
        if (message) {
            setPrivateChatMessages((prev) => {
                return [...prev, { from: username, message: message }];
            });

            setText("");
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "auto";
            }

            await fetch("/chats/send-message", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ reciever: recieverUsername, date: "14:88", message: message }),
            })
        }
    }

    return <section className="private-chat">
        <ChatHeader username={recieverUsername!} profilePicture={""} />
        <div className="messages-container">
            {privateChatMessages?.map((message: Message) => {
                return <MessageELement username={message.from} message={message.message} imageLink={""} />
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