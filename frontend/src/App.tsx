import "./App.css"

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import Layout from './components/elements/Layout';
import PrivateMessagesPage from './components/pages/PrivateMessagesPage';
import PrivateChatWindow from './components/pages/PrivateChatWindow';
import FriendsPage from "./components/pages/FriendsPage";
import AddFriendPage from "./components/pages/AddFriendPage";
import FriendsList from "./components/elements/FriendsList";
import FriendsRequests from "./components/pages/FriendsRequests";

import type { requestData } from "./types";

function App() {
  const [userIsLoggined, setAuthState] = useState(false);
  const [friendsRequests, addRequest] = useState<requestData[]>([]);

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

  const sendMessageHandler = () =>{
    console.log("");
  }

  const mutation = useMutation({mutationKey: ["test_fetch"], mutationFn: async () => {
    await fetch("/contacts/get-test-notification");
  }})

  useEffect(() => {
    if(!userIsLoggined) return;

    //"ws://192.168.56.1/contacts/contacts-notification"

    const contactsNotification = new WebSocket(
        "ws://127.0.0.1:8000/contacts/contacts-notification"
    );
    
    contactsNotification.onmessage = (e) => {
        const data : requestData = JSON.parse(e.data)
        addRequest((prev) => {
          return [...prev, data]
        })
    };

    contactsNotification.onopen = () => {
      mutation.mutate();
    }
  }, [userIsLoggined])

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout data={data} userIsLoggined={userIsLoggined} setAuthState={() => {
          setAuthState(true);
        }} />}>
          <Route path='/group-chats/group:groupId' element={null} />
          <Route path='/contacts' element={<PrivateMessagesPage />} >
            <Route path=':chatId' element={<PrivateChatWindow userID={1} username='lil4mo' messages={[]} onMessageSended={sendMessageHandler}/>} />
            <Route path="friends" element={<FriendsPage friendsRequestsAvailable={friendsRequests.length != 0}/>}> 
              <Route index element={<FriendsList />} />
              <Route path="add-friend" element={<AddFriendPage />} />
              <Route path="friends-requests" element={<FriendsRequests requests={friendsRequests}/>} />
            </Route>
          </Route>
        </Route>
    </Routes>
    </>
  );
}

export default App;