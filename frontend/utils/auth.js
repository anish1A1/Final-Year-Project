"use client"
import axios from "../utils/axios";
import React, { createContext, useState, useEffect, useMemo } from "react";


const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setError] = useState({});

    

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                await fetchUserData(token);
            } else {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchUserData = async (token) => {
        try {
            const response = await axios.get(`/api/auth/dashboard/`);
            setUser(response.data.user);

        } catch (error) {
            
            console.error("Error fetching user data:", error); 
        }finally {
            setLoading(false);
        }
    };


    const login = async (credentials, router) => {
        try {
            const response = await axios.post(`/api/auth/login/`, credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { access , refresh } = response.data;
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);
            // console.log(response.data);
            
            axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
            await fetchUserData(access);
            
            router.push('/');

            // Redirect to the home page
        // window.location.href = redirect_url;

        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError({ general: 'Invalid credentials. Please try again.' });
            } else if (error.response && error.response.status) {
                setError(error.response.data);
            } else {
                console.error("Error fetching user data:", error); 
            }

        }finally {
            setLoading(false);
        }
    }


    const register = async (credentials, router) => {
        try {
            const response = await axios.post(`/api/auth/register/`, credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log(response.data);
            router.push('/login');

        } catch (error) {

            if (error.response && error.response.status) {
                setError(error.response.data);
            }
            else{
                console.error("Error fetching user data:", error); 
            }
            console.error("Error fetching user data:", error); 
        }finally {
            setLoading(false);
        }
    };



    const logout = async (router) => {
        try {
            // await axios.post(`${API_URL}logout/`);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error("Error logging out:", error); 
        }finally {
            setLoading(false);
        }
    };

    const authContextValue = useMemo(() => ({
        user,
        loading,
        login,
        logout,
        register,
        errors,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [user, loading, errors]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };
