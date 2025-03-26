"use client";
import { useState, useEffect } from 'react';
import { useCreateChatClient, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

const apiKey = process.env.STREAM_APP_ID;
const userId = 'autumn-limit-5';
const userName = 'autumn';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYXV0dW1uLWxpbWl0LTUiLCJleHAiOjE3NDI4MTQ4NDh9.WI5ODi9kktTWnhHMgZy37qCMwbaxBR1Lc2_hA9Sxbiw';

const user = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?name=${userName}`,
};

export default function ChatForum() {
  const [channel, setChannel] = useState();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel('messaging', 'custom_channel_id', {
      image: 'https://getstream.io/random_png/?name=react',
      name: 'Talk about React',
      members: [userId],
    });

    setChannel(channel);
  }, [client]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};
