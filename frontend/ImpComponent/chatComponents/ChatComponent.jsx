"use client";
import React, {useContext, useEffect, useState} from 'react'
import { StreamChat } from 'stream-chat';
// import "stream-chat-react/dist/css/index.css";
import axios from '../../utils/axios';
import { Channel, ChannelList, Chat, Message, MessageList, MessageInput, Window, ChannelHeader } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { AuthContext } from '../../utils/auth';
import { useRouter } from 'next/navigation';

const ChatComponent = () => {
    const {user} = useContext(AuthContext);
    const router = useRouter();
    
    const [client, setClient] = useState(null);
  
    
    const secretKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    useEffect(() => {
        const initChat = async () => {
            try {
                const response = await axios.get("/api/chat/product-chat/", {
                    
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.data;
                console.log(data);
                if(!data.token) return;

                

                if(!client) {
                    const { StreamChat} = await import('stream-chat');
                    const chatClient = StreamChat.getInstance(secretKey);
                    chatClient.connectUser(
                        {id: data.user_id, name: data.username},
                        data.token
                    );

                    setClient(chatClient);
                }
            } catch (error) {
                console.error("Error initializing chat:", error);
            }
        };
        initChat();
        return () => client?.disconnectUser();

    }, [client, user]);

    

    

    
    if (!client) return <p className='mt-36'>Loading Chat.....</p>
  return (
   <Chat client={client}>
  <div className="flex h-[500px]  w-full">
    {/* Sidebar with Channels/Users */}
    <div className="w-1/4 flex-1  bg-gray-100 border-r border-gray-300 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Chats</h2>
      <ChannelList
        filters={{ type: "messaging", members: { $in: [String(user?.id)] } }}
        options={{ state: true, watch: true }}
        />

    </div>

    {/* Main Chat Area */}
    <div className="w-3/4 flex-3  bg-white">
      {/* Chat Header */}
      <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-700">Chat Room</h2>
      </div>

      {/* Message List and Input */}
      <Channel>
        <Window>
          <div className="flex-1 overflow-y-auto">
            <MessageList />
          </div>
          <div className="border-t border-gray-300 p-4">
            <MessageInput />
          </div>
        </Window>
      </Channel>
    </div>
  </div>
</Chat>
  )
}

export default ChatComponent;
