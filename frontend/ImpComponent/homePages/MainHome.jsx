"use client";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/auth";
import AdminDeliveries from "../../app/components/adminDash/AdminDeliveries";
import ViewProduct from "../../app/(products)/viewProduct/page";





const MainHome = () => {
    const {user} = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user && user.user_roles) {
            
           
            setIsUser(true);
            console.log(user);
        }
        if (user && user.user_roles) {
            
            const adminRole = user.user_roles.some((role) => role.role.name === 'admin');
           
            setIsAdmin(adminRole);
        }
    }, [user]);

    return (
        <div className="">
            {isAdmin ? (
                <AdminDeliveries />
            ): (
                <ViewProduct />
            )}
        </div>
    );
};

export default MainHome;
