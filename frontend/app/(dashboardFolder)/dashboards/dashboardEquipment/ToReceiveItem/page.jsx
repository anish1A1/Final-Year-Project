"use client";
import React, { useState, useEffect, useContext } from 'react';
import axios from '../../../../../utils/axios';
import { EquipmentContext } from '../../../../../utils/equip';
import { AuthContext } from '../../../../../utils/auth';

const ToReceiveItem = () => {
    const { fetchEquipmentDeliveriesToReceive, deliveryReceive, fetchEquipment, equipment, fetchEquipmentBookings, equipmentBooks } = useContext(EquipmentContext);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching deliveries to receive...");
            await fetchEquipmentDeliveriesToReceive();
            await fetchEquipment();
            await fetchEquipmentBookings();
        };
        fetchData();
    }, []);

    const getBookingDetails = (bookingId) => {
        const bookingCaught = equipmentBooks.find(booking => booking.id === bookingId) || {};
        const bookedEquipment = equipment.find(equip => equip.id === bookingCaught.equipment) || {};

        return {
            bookingCaught,
            equipment: bookedEquipment
        };
    };

    return (
        <div className="mt-24 px-4">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold mb-6">To Receive</h1>
                <div className="flex flex-col justify-center w-full max-w-4xl">
                    {deliveryReceive.length === 0 ? (
                        <div className="text-center text-gray-600">No items to receive</div>
                    ) : (
                        deliveryReceive.map((delivery) => {
                            const { bookingCaught, equipment: bookedEquipment } = getBookingDetails(delivery.equipment_payment.equipment_booking);
                            return (
                                <div key={delivery.id} className="flex flex-col justify-center bg-white shadow-md rounded-lg p-6 mb-4">
                                    <p className="text-lg font-semibold mb-2">Delivery ID: <span className="font-normal">{delivery.id}</span></p>
                                    <p className="text-lg font-semibold mb-2">Status: <span className="font-normal">{delivery.status}</span></p>
                                    <p className="text-lg font-semibold mb-2">User for Delivery: <span className="font-normal">{delivery.equipment_payment.user}</span></p>
                                    <p className="text-lg font-semibold mb-2">Total Amount: <span className="font-normal">{delivery.equipment_payment.amount}</span></p>
                                    <p className="text-lg font-semibold mb-2">Location: <span className="font-normal">{bookingCaught.delivery_location || 'N/A'}</span></p>
                                    <p className="text-lg font-semibold mb-2">Quantity: <span className="font-normal">{bookingCaught.quantity || 'N/A'}</span></p>
                                    <p className="text-lg font-semibold mb-2">Total Date: <span className="font-normal">{bookingCaught.total_date || 'N/A'}</span></p>
                                    <p className="text-lg font-semibold mb-2">Start Date: <span className="font-normal">{bookingCaught.start_date || 'N/A'}</span></p>
                                    <p className="text-lg font-semibold mb-2">End Date: <span className="font-normal">{bookingCaught.end_date || 'N/A'}</span></p>
                                    <p className="text-lg font-semibold mb-2">Equipment Name: <span className="font-normal">{bookedEquipment.name || 'N/A'}</span></p>
                                    <p className="text-lg font-semibold mb-2">Equipment Owner: <span className="font-normal">{bookedEquipment.user ? bookedEquipment.user : 'N/A'}</span></p>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default ToReceiveItem;
