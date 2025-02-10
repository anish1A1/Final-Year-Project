"use client"

import axios from "../utils/axios";
import React, { useState, useMemo, createContext, useContext } from "react";
import { AuthContext } from "./auth";


const EquipmentContext = createContext();

export const EquipProvider = ({children}) => {
    const [equipment, setEquipment] = useState([]);
    const [equipmentBooks, setEquipmentBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setError] = useState({});
    const [equipmentPurchases, setEquipmentPurchases] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const { user } = useContext(AuthContext);   // Since we also need to pass the user as it is required in the model



    const fetchEquipment = async () => {
        try {
            const response = await axios.get('/api/equipment/');
            setEquipment(response.data);

        } catch (error) {
            console.error(`Error fetching equipment: ${error}`);
            setError(error.response?.data || error.message);
        }
        finally {
            setLoading(false);
        }

    };

    const createEquipment = async (formData, router) => {
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();

            for(const key in formData) {
                data.append(key, formData[key]);
            }

            if (user){
                data.append('user', user.id);  // Include the authenticated user's ID in the form data
            }

            const response = await axios.post('/api/equipment/', data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }

            });
            setEquipment((prevEquipment) => [...prevEquipment,
                response.data
            ]);
            router.push('/equipmentList');
        } catch (error) {
            console.error(`Error creating equipment: ${error}`);
            setError(error.response.data);
        } 
    };

    const getEquipmentById = async (id) => {
        try {
            const response = await axios.get(`/api/equipment/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            
            return response.data;
        } catch (error) {
            console.error(`Error fetching equipment by ID: ${error}`);
            if (error.response && error.response.status === 404) {
                throw new Error('Equipment not found');
            } else {
                throw error;
            }
        }
    }

    const updateEquipment = async (id, formData, router) => {
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();

            for(const key in formData) {
                data.append(key, formData[key]);
            }

            const response = await axios.put(`/api/equipment/${id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            setEquipment((prevEquipment) => prevEquipment.map(item => item.id === id ? response.data : item));
            router.push('/equipmentList');
        } catch (error) {
            console.error(`Error updating equipment: ${error}`);
            setError(error.response.data);
        }
    };

    const deleteEquipment = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/equipment/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEquipmentBooks((prevBookedEquipment) => prevBookedEquipment.map(item => item.id === id ? response.data : item));
        } catch (error) {
            console.error(`Error deleting equipment: ${error}`);
            setError(error.response.data);
        }
    };

    const fetchEquipmentBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/equipment-bookings/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Fetched Equipment Bookings:', response.data);  // Log fetched bookings data
            setEquipmentBooks(response.data);
            
        } catch (error) {
            console.error(`Error fetching equipment bookings: ${error}`);
            setError(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const createEquipmentBookings = async (formData, router) => {
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();

            for(const key in formData) {
                data.append(key, formData[key]);
                }

            if (user){
                data.append('user', user.id);  // Include the authenticated user's ID in the form data
            }

            const response = await axios.post('/api/equipment-bookings/', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            
            setEquipmentBooks((prevEquipmentBookings) => [...prevEquipmentBookings,
                response.data
            ]);
            router.push('/equipmentList');
        } catch (error) {
            console.error(`Error creating equipment: ${error}`);
            setError(error.response.data);
        }
    }

    const updateBookingStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`/api/equipment-bookings/${id}/`, { status }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error(`Error updating booking status: ${error}`);
        }
    };

    const fetchEquipmentPayment = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/equipment-payments/', {
                headers: { 'Authorization': `Bearer ${token}` }

            });
            setEquipmentPurchases(response.data)
        } catch (error) {
            console.error(`Error fetching the payments`, error);
            setError(error); 
        }
        finally {
            setLoading(false);
        }
    };
    const createEquipmentPayment = async (formData, router, setError) => {
        const token = localStorage.getItem('token');
        const data = new FormData();
    
        for (const key in formData) {
            data.append(key, formData[key]);
        }
    
        if (user) {
            data.append('user', user.id);  // Include the authenticated user's ID in the form data
        }
    
        try {
            const response = await axios.post('/api/equipment-payments/', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            setError(null);   //clears any existing error
            setEquipmentPurchases((equipmentPurchases) => [
                ...equipmentPurchases,
                response.data
            ]);
            router.push('/dashboards');
        } catch (error) {
            console.error(`Error Doing Payment of equipment: ${error}`);
            setError(error.response.data);
        }
    };

    // Fetch all deliveries
    const fetchEquipmentDeliveries = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/equipment-delivery/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Fetched Deliveries:', response.data); // Log to verify
            setDeliveries(response.data);
        } catch (error) {
            console.error(`Error fetching deliveries: ${error}`);
        }
    };
    

    const updateEquipmentDelivery = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`/api/equipment-delivery/${id}/`, { status }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Updated Delivery:', id, status);
            
        } catch (error) {
            console.error(`Error Updating Equipment's Delivery: ${error}`);
            setError(error.response.data);
        }
    };
    
    

    
    

    const equipContextValue = useMemo(() => ({
        equipment,
        loading,
        errors,
        equipmentBooks,
        equipmentPurchases,
        deliveries,
        fetchEquipment,
        createEquipment,
        updateEquipment,
        deleteEquipment,
        getEquipmentById,
        fetchEquipmentBookings,
        createEquipmentBookings,
        updateBookingStatus,
        createEquipmentPayment,
        fetchEquipmentPayment,
        fetchEquipmentDeliveries,
        updateEquipmentDelivery,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [equipment, equipmentBooks, equipmentPurchases,deliveries, loading, errors, user]);
    
    return (
        <EquipmentContext.Provider value={equipContextValue} >
        {children}
        </EquipmentContext.Provider>
    );
}

export {EquipmentContext};
