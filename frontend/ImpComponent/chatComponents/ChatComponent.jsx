"use client"
import React, {useContext, useEffect, useState} from 'react'
import { StreamChat } from 'stream-chat';
// import "stream-chat-react/dist/css/index.css";
import axios from '../../utils/axios';
import { Channel, ChannelList, Chat, Message, MessageList, MessageInput } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { AuthContext } from '../../utils/auth';

const ChatComponent = () => {
    const {user} = useContext(AuthContext);
    const [client, setClient] = useState(null);
    const secretKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    console.log("STREAM API KEY:", secretKey); // should print "ff49bpxq6srw"
    console.log(process.env);
    useEffect(() => {
        const initChat = async () => {
            try {
                const response = await axios.get("/api/chat/product-chat/", {
                    
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(response.data);
                const data = await response.data;

                if(!data.token) return;

                if(!client) {
                    const chatClient = StreamChat.getInstance(secretKey);
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

    }, [client]);

    
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

export default ChatComponent;
