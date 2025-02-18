"use client";
import React, { useState, useEffect, useContext } from 'react';
import { EquipmentContext } from '../../../../../utils/equip';
import { AuthContext } from '../../../../../utils/auth';
import { useRouter } from 'next/navigation';

const EquipmentToBookList = () => {
    const { fetchEquipmentBookings, equipmentBooks, fetchEquipmentPayment, equipmentPurchases, loading, fetchEquipment, equipment } = useContext(EquipmentContext);
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
                .filter((item) => item.equipmentDetails && item.equipmentDetails.user !== user.username);
            setCombinedBookings(combined);
        }
    }, [equipmentBooks, equipment, user]);

    const hasMadePayment = (bookingId) => {
        return equipmentPurchases.some(payment => payment.equipment_booking === bookingId);
    };

    const handleStatusAccept = (id) => {
        router.push(`/createEquipmentPayment/${id}`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
    }

    if (!combinedBookings || combinedBookings.length === 0) {
        return <div className="flex justify-center items-center h-screen text-xl font-semibold">No equipment bookings available.</div>;
    }

    return (
        <div className="container mx-auto mt-28 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Equipments Requested to Rent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {combinedBookings.map((item) => (
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={item.id}>
                        {item.equipmentDetails ? (
                            <>
                                <img src={item.equipmentDetails.image} alt={item.equipmentDetails.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.equipmentDetails.name}</h2>
                                    <p className="text-gray-600 text-sm">Per Day Rate: <span className="font-bold">${item.equipmentDetails.per_day_rate}</span></p>
                                    <p className="text-gray-600 text-sm">Start Date: {item.start_date}</p>
                                    <p className="text-gray-600 text-sm">End Date: {item.end_date}</p>
                                    <p className="text-gray-600 text-sm">Total Days: {item.total_date}</p>
                                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                    <p className="text-gray-600 text-sm">Total Price: <span className="font-bold">${item.total_cost}</span></p>
                                    <p className="text-gray-600 text-sm">Location: {item.delivery_location}</p>
                                    <p className="text-gray-600 text-sm">Booking Status: <span className={`font-bold ${item.status === 'accepted' ? 'text-green-500' : 'text-yellow-500'}`}>{item.status}</span></p>
                                    <p className="text-gray-600 text-sm">Equipment Owner: {item.equipmentDetails.user}</p>

                                    {item.status === 'accepted' && !hasMadePayment(item.id) && (
                                        <button
                                            onClick={() => handleStatusAccept(item.id)}
                                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                        >
                                            Make Payment
                                        </button>
                                    )}

                                    {item.status === 'accepted' && hasMadePayment(item.id) && (
                                        <p className="mt-4 text-center text-green-500 font-semibold">Payment Completed</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-800">Equipment details not found</h2>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EquipmentToBookList;
