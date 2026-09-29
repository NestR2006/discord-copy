import "./App.css"

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Layout from './components/elements/Layout';
import PrivateMessagesPage from './components/pages/PrivateMessagesPage';
import PrivateChatWindow from './components/pages/PrivateChatWindow';
import FriendsPage from "./components/pages/FriendsPage";
import AddFriendPage from "./components/pages/AddFriendPage";
import FriendsList from "./components/elements/FriendsList";
import FriendsRequests from "./components/pages/FriendsRequests";

import type { requestData, PrivateChatProps, ChatHistoryResponse } from "./types";

function App() {
  const [userIsLoggined, setAuthState] = useState(false);
  const [friendsRequests, addRequest] = useState<requestData[]>([]);

  const [privateChats, setPrivateChats] = useState<PrivateChatProps[]>([]);

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch("/users/me", { credentials: "include" });
      if (response.ok) {
        setAuthState(true);
        return await response.json();
      }
    }
  });

  const chatsListMutation = useMutation({
    mutationKey: ["chatsList"], mutationFn: async () => {
      const response = await fetch("/chats/");
      const data = await response.json();
      setPrivateChats(data.chats);
    }
  })

  const addNewChat = async (username: string) => {
    await fetch(`/chats/create-chat?username=${username}`, {
      method: "POST",
      credentials: "include",
    })
  }

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userIsLoggined) return;

    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsHost = window.location.hostname;
    const wsPort = "8000";

    const contactsNotification = new WebSocket(`${wsProtocol}//${wsHost}:${wsPort}/contacts/contacts-notification`);
    contactsNotification.onmessage = (e) => {
      const data: requestData = JSON.parse(e.data)
      addRequest((prev) => {
        return [...prev, data]
      })

    };

    const messages_transport = new WebSocket(`${wsProtocol}//${wsHost}:${wsPort}/chats/transport-message`)
    messages_transport.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (!privateChats.some((chat) => { chat.username == data.from })) {
        addNewChat(data.from);
      }

      queryClient.setQueryData(
        ["chatHistory", data.from],
        (oldData: ChatHistoryResponse) => {
          const newData = {
            ...oldData,
            chatHistory: [
              ...oldData.chatHistory,
              { from: data.from, message: data.message }
            ]
          };

          return newData;
        }
      );
    };

    chatsListMutation.mutate();

  }, [userIsLoggined])


  const acceptFriendRequestHandler = async (senderUsername: string) => {
    const response = await fetch(`/contacts/accept-request?senderUsername=${senderUsername}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (response.ok) {
      addRequest(friendsRequests.filter((request) => { return request.username !== senderUsername }));
    }
  }

  const declineFriendRequestHandler = (senderUsername: string) => {
    addRequest(friendsRequests.filter((request) => { return request.username !== senderUsername }));
  }


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout data={data} userIsLoggined={userIsLoggined} setAuthState={() => {
          setAuthState(true);
        }} />}>
          <Route path='/group-chats/group:groupId' element={null} />
          <Route path='/contacts' element={<PrivateMessagesPage privateChats={privateChats} />} >
            <Route path=':recieverParamUsername' element={<PrivateChatWindow username={data?.username} profilePictureLink={data?.profilePicture} />} />
            <Route path="friends" element={<FriendsPage friendsRequestsAvailable={friendsRequests.length != 0} />}>
              <Route index element={<FriendsList />} />
              <Route path="add-friend" element={<AddFriendPage />} />
              <Route path="friends-requests" element={<FriendsRequests requests={friendsRequests} onAccept={acceptFriendRequestHandler} onDecline={declineFriendRequestHandler} />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;