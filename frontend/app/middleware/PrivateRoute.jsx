"use client";
import React, {useContext, useEffect} from "react";
import { useRouter } from 'next/navigation';
import {AuthContext} from "../../utils/auth";


const PrivateRoute = ({ children }) => {
    const { user,loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user){
            router.push('/login');
        }
    }, [loading, user, router])
   
    if (loading || !user) {
        return <div>loading ...</div>;
    }
    return children;
};

export default PrivateRoute;