"use client";
import React, { useState, useEffect, useContext } from 'react';
import { EquipmentContext } from '../../../../utils/equip';
import { AuthContext } from '../../../../utils/auth';

const ToDeliverItem = () => {
    const { fetchEquipmentDeliveries, deliveries, updateEquipmentDelivery, fetchEquipmentBookings, fetchEquipment, equipmentBooks, equipment   } = useContext(EquipmentContext);
    const { user } = useContext(AuthContext);
  
    const [selectedStatus, setSelectedStatus] = useState({});
    const [userDeliveries, setUserDeliveries] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            await fetchEquipmentDeliveries();
            await fetchEquipmentBookings();
            await fetchEquipment();
        }
        fetchData();
    }, [ ]);

    const handleStatusChange = (id, status) => {
        setSelectedStatus(prevState => ({
            ...prevState,
            [id]: status,
        }));
    };
    
    const handleDeliveryStatusSubmit = async (id) => {
        if (selectedStatus[id]) {
            const updatedDelivery = await updateEquipmentDelivery(id, selectedStatus[id]);
            if (updatedDelivery) {
                setUserDeliveries(userDeliveries.map(delivery => 
                    delivery.id === id ? { ...delivery, status: updatedDelivery.status } : delivery
                ));
            }
        }
    };
    
    const getBookingDetails = (bookingId) => {
        const bookingCaught = equipmentBooks.find(booking => booking.id === bookingId) || {};
        const bookedEquipment = equipment.find(equip => equip.id === bookingCaught.equipment) || {};

        return {
            bookingCaught,
            equipment: bookedEquipment
        };
    };


   

    return (
        
        
            <div className="container mt-32 p-4">
                <h2 className="text-xl font-bold mb-4">Items Ready for Delivery</h2>
                {deliveries.length === 0 ? (
                    <div>No items to deliver</div>
                ) : (
                    deliveries.map((delivery) => {
                        const { bookingCaught, equipment: bookedEquipment } = getBookingDetails(delivery.equipment_payment.equipment_booking);
                        return (
                            <div key={delivery.id} className="card w-full bg-base-100 shadow-xl mb-4">
                                <div className="card-body p-4">
                                    <h3 className="card-title text-lg font-bold mb-2">Delivery ID: {delivery.id}</h3>
                                    <p className="text-sm mb-1">Payment ID: {delivery.equipment_payment.id}</p>
                                    <p className="text-sm mb-1">User: {delivery.equipment_payment.user}</p>
                                    <p className="text-sm mb-1">Equipment: {bookedEquipment?.name || 'N/A'}</p>
                                    <p className="text-sm mb-1">Quantity: {bookingCaught?.quantity || 'N/A'}</p>
                                    <p className="text-sm mb-1">Location: {bookingCaught?.delivery_location || 'N/A'}</p>
                                    <p className="text-sm mb-1">Rent Start Date: {bookingCaught?.start_date || 'N/A'}</p>
                                    <p className="text-sm mb-1">Rent End Date: {bookingCaught?.end_date || 'N/A'}</p>
                                    <p className="text-sm mb-1">Total Date: {bookingCaught?.total_date || 'N/A'}</p>
                                    <p className="text-sm mb-1">Date Paid: {delivery.equipment_payment?.date_paid || 'N/A'}</p>
                                    <p className="text-sm mb-1">Status: {delivery.status}</p>
                                    <label className="block text-sm font-medium text-gray-700">Update Delivery Status:</label>
                                    <select value={selectedStatus[delivery.id] || delivery.status} onChange={(e) => handleStatusChange(delivery.id, e.target.value)} className="mt-1 block w-full mb-4">
                                        <option value="processing">Processing</option>
                                        <option value="delivering">Delivering</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                    <button onClick={() => handleDeliveryStatusSubmit(delivery.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        );
};

export default ToDeliverItem;
