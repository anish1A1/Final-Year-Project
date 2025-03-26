"use client"
import React, {useEffect, useState} from 'react'
import { StreamChat } from 'stream-chat';
// import "stream-chat-react/dist/css/index.css";
import axios from '../../utils/axios';
import { Channel, ChannelList, Chat, Message, MessageList, MessageInput } from 'stream-chat-react';
const ChatComponent = ({user}) => {
    const [client, setClient] = useState(null);

    useEffect(() => {
        const initChat = async () => {
            try {
                const response = await axios.get("/api/stream-token/", {
                    
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(response);
                const data = await response.data;

                if(!data.token) return;

                if(!client) {
                    const chatClient = StreamChat.getInstance(data.api_key);
                    chatClient.connectUser(
                        {id: data.user_id, name: user.username},
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

    }, [user,client]);

    
    if (!client) return <p className='mt-36'>Loading Chat.....</p>
  return (
    <Chat client={client}>

        <ChannelList />
        <Channel>
            <Window>
                <MessageList />
                <MessageInput />
            </Window>
        </Channel>

    </Chat>
  )
}

export default ChatComponent
