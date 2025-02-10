"use client";
import React, { useState, useEffect, useContext } from 'react';
import { EquipmentContext } from '../../../../../utils/equip';
import { AuthContext } from '../../../../../utils/auth';
import { useRouter } from 'next/navigation';

const EquipmentToBookList = () => {
    const { fetchEquipmentBookings, equipmentBooks, fetchEquipmentPayment,equipmentPurchases, loading, fetchEquipment, equipment } = useContext(EquipmentContext);
    const { user } = useContext(AuthContext);
    const [combinedBookings, setCombinedBookings] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            await fetchEquipmentBookings();
            await fetchEquipment();
            await fetchEquipmentPayment();
        };
        fetchData();
    }, []);

    useEffect(() => {
       

        if (Array.isArray(equipmentBooks) && equipmentBooks.length > 0 && Array.isArray(equipment) && equipment.length > 0 && user) {
            const userBookings = equipmentBooks.filter(booking => booking.user === user.username);
            const combined = userBookings
                .map((booking) => {
                    const equipmentDetails = equipment.find((equip) => equip.id === booking.equipment);
                    return {
                        ...booking,
                        equipmentDetails: equipmentDetails,
                    };
                })
                .filter((item) => item.equipmentDetails && item.equipmentDetails.user !== user.username);  // Ensure the user is not the creator of the equipment
            console.log('Combined Bookings:', combined);  // Log combined bookings data
            setCombinedBookings(combined);
        }
    }, [equipmentBooks, equipment, user]);

    const hasMadePayment = (bookingId) => {
      return equipmentPurchases.some(payment => payment.equipment_booking === bookingId);
    }                  // checks the payment's equipment_booking id is equal to bookingId. If it matches than the item is already purchased

    const handleStatusAccept = (id) => {
        router.push(`/createEquipmentPayment/${id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!combinedBookings || combinedBookings.length === 0) {
        return <div>No equipment bookings available.</div>;
    }

    return (
        <div className='container mt-28 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <h2 className='col-span-full text-xl font-bold mb-4'>Equipments Requested to Rent</h2>
            {combinedBookings.map((item) => (
                <div className="col-span-1 md:col-span-1 lg:col-span-1" key={item.id}>
                    <div className="card w-full bg-base-100 shadow-xl">
                        {item.equipmentDetails ? (
                            <>
                                <img src={item.equipmentDetails.image} alt={item.equipmentDetails.name} className="w-full h-48 object-cover" />
                                <div className="card-body p-4">
                                    <h2 className="card-title text-lg font-bold mb-2">{item.equipmentDetails.name}</h2>
                                    <p className="text-sm mb-1">Per Day Rate: ${item.equipmentDetails.per_day_rate}</p>
                                    <p className="text-sm mb-1">Start Date: {item.start_date}</p>
                                    <p className="text-sm mb-1">End Date: {item.end_date}</p>
                                    <p className="text-sm mb-1">Total Days: {item.total_date}</p>
                                    <p className="text-sm mb-1">Quantity: {item.quantity}</p>
                                    <p className="text-sm mb-1">Total Price: ${item.total_cost}</p>
                                    <p className="text-sm mb-1">Location: {item.delivery_location}</p>
                                    <p className="text-sm mb-1">Booking Status: {item.status}</p>

                                    {item.status === 'accepted' && 
                                        hasMadePayment(item.id) ? (
                                          <p className="text-sm mb-1 text-green-500 text-center">You have already made a payment</p>
                                        ) : (
                                        <button onClick={() => handleStatusAccept(item.id)}>Make Payment</button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="card-body p-4">
                                <h2 className="card-title text-lg font-bold mb-2">Equipment details not found</h2>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EquipmentToBookList;
