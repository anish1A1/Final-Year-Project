"use client";

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/utils/auth';
import { useRouter } from "next/navigation";
import MenuLink from './MenuLink';

const UserNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();
    const [isFarmer, setIsFarmer] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user && user.user_roles) {
            
            const farmerRole = user.user_roles.some((role: { role: { name: string; }; }) => role.role.name === 'farmer');
           
            setIsFarmer(farmerRole);
        }
        if (user && user.user_roles) {
            
            const adminRole = user.user_roles.some((role: { role: { name: string; }; }) => role.role.name === 'admin');
           
            setIsAdmin(adminRole);
        }
    }, [user]);

    return (
        <div className='p-2 relative inline-block border rounded-full'>
            <button onClick={() => setIsOpen(!isOpen)} 
                className='flex items-center'>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </button>

            {isOpen && (
                <div className="w-[220px] absolute top-[60px] right-0 border bg-white rounded-xl shadow-md flex flex-col cursor-pointer">
                    {user ? (
                        <>
                            <MenuLink label="Log Out" onClick={() => {
                                logout(router);
                                setIsOpen(false);  // This will close the Menu
                            }} />

                            <MenuLink label="Dashboard" onClick={() => {
                                router.push('/dashboards');
                                setIsOpen(false);  // This will close the Menu
                            }} />
                            {isFarmer ?(
                                     
                                     <MenuLink label="Product Dashboard" onClick={() => {
                                        router.push('/productDashboard');
                                        setIsOpen(false);  // This will close the Menu
                                    }} />
                            ) : null}
                            {isAdmin ?(
                                     
                                     <MenuLink label="Admin Deliveries" onClick={() => {
                                        router.push('/adminDashboard');
                                        setIsOpen(false);  // This will close the Menu
                                    }} />
                            ) : null}
                        </>
                    ) : (
                        <>
                            <MenuLink label="Log In" onClick={() => {
                                router.push('/login');
                                setIsOpen(false);  // This will close the Menu
                            }} />
                            <MenuLink label="Sign Up" onClick={() => {
                                router.push('/register');
                                setIsOpen(false);  // This will close the Menu
                            }} />


                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserNav;
