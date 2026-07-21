import { useState } from 'react';
import './App.css'

import ChatsListSidebar from './components/sidebars/GroupsListSidebar'
import PrivateMessagesSidebar from './components/sidebars/PrivateChatsSidebar'
import PrivateChatWindow from './components/pages/PrivateChatWindow'
import AuthorizationWindow from './components/pages/AuthorizationWindow'

import type { MessageStructure } from './types'

import { useQuery } from '@tanstack/react-query';

function App() {
  const [activeUserChatID, setChat] = useState(-1);
  const [userIsLoggined, setAuthState] = useState(false);
  const [usersUsername, setUsername] = useState("");

  const {data} = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch("/users/me", {
        credentials: "include"
      });
      if(response.ok) return await response.json();
    }
  })

  const [chats, setChats] = useState<Record<number, MessageStructure[]>>({})
 
  const addMessage = (userID: number, newMessage: MessageStructure) => {
    setChats(prev => ({
        ...prev,
        [userID]: [...(prev[userID] ?? []), newMessage]
    }));
  };

  return <section id='main-body'>
             {(data || userIsLoggined) ?
              <>
                <ChatsListSidebar />
                <PrivateMessagesSidebar onActiveChatChanged={(chatID) => {
                  setChat(chatID);
                }}/>
                <PrivateChatWindow userID={activeUserChatID} onMessageSended={addMessage} messages={chats[activeUserChatID]} username={usersUsername}/>
              </> 
                : 
             <AuthorizationWindow onSuccessfulAuthorization={(username) => {setAuthState(true); setUsername(username)}}/>}
          </section>
}

export default App
