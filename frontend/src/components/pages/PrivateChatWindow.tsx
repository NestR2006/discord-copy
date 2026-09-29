import "../../styles/privateChat.css"

import { Plus, Gift, Sticker, Smile, Grid3x3 } from "lucide-react";

import ChatHeader from "../elements/ChatHeader";
import MessageELement from "../elements/MessageElement";

import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { ChatHistoryResponse, Message } from "../../types";

interface PrivateChatWindowProps {
    username: string,
    profilePictureLink: string,
}

const PrivateChatWindow = ({ username, profilePictureLink }: PrivateChatWindowProps) => {
    const [text, setText] = useState("");
    const { recieverParamUsername } = useParams();
    const [recieverProfilePictureLink, setRecieverProfilePictureLink] = useState("");
    const [privateChatMessages, setPrivateChatMessages] = useState<Message[]>([]);

    const recieverUsername: string = recieverParamUsername!.toString();

    const queryClient = useQueryClient()

    const setUserProfilePicture = async (username: string) => {
        const response = await fetch(`/users/avatar?username=${username}`)
        const buf = await response.json();
        setRecieverProfilePictureLink(buf.profilePicture)
    }

    useEffect(() => {
        setUserProfilePicture(recieverUsername);
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
            setText("");
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "auto";
            }

            const response = await fetch("/chats/send-message", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ reciever: recieverUsername, date: "14:88", message: message }),
            })

            const data = await response.json();
            const new_messageID = data.ID;

            setPrivateChatMessages((prev) => {
                return [...prev, { id: new_messageID, from: username, message: message, is_changed: 0 }];
            });
        }
    }

    const deleteMessageHandler = async (messageID: number) => {
        console.log(messageID);

        const buf = {
            message_id: messageID,
            co_owner: recieverUsername,
        }

        const response = await fetch("/chats/delete-message", {
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(buf)
        })

        if (response.ok) {
            queryClient.setQueryData(
                ["chatHistory", recieverUsername],
                (oldData: ChatHistoryResponse) => {
                    return {
                        ...oldData,
                        chatHistory: oldData.chatHistory.filter(
                            (message) => message.id !== messageID
                        )
                    };
                })
        }
    }

    const changeMessageHandler = async (messageID: number, newMessage: string) => {
        const buf = {
            new_message: newMessage,
            co_owner: recieverUsername,
            message_id: messageID
        }

        await fetch("/chats/change-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(buf),
        });

        console.log(messageID, newMessage);
    }

    return <section className="private-chat">
        <ChatHeader username={recieverUsername!} profilePicture={recieverProfilePictureLink} />
        <div className="messages-container">
            {privateChatMessages?.map((message: Message) => {
                return <MessageELement username={message.from}
                    id={message.id}
                    message={message.message}
                    imageLink={username == message.from ? profilePictureLink : recieverProfilePictureLink}
                    isChanged={message.is_changed}
                    onDeleteMessage={deleteMessageHandler}
                    onChangeMessage={changeMessageHandler} />
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