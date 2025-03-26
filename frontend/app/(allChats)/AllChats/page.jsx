"use client";

import ChatComponent from "../../../ImpComponent/chatComponents/ChatComponent";
import { AuthContext } from "../../../utils/auth";

import React, { useState, useEffect, useContext } from 'react'

const ChatPage = () => {
    const {user} = useContext(AuthContext);

    if(!user) return <p className="mt-36"> Loading User</p>
  
    return (
    <div className="mt-36">
        <ChatComponent user={user} />

    </div>
    )
}

export default ChatPage;
