"use client";
import React, { useState, useEffect, useContext } from 'react';
import { EquipmentContext } from '../../../../../utils/equip';
import { AuthContext } from '../../../../../utils/auth';
import { toast } from 'sonner';


const ManageEquipment = () => {
    const { fetchEquipmentBookings, equipmentBooks, loading, fetchEquipment, equipment, updateBookingStatus } = useContext(EquipmentContext);
    const { user } = useContext(AuthContext);
    const [combinedBookings, setCombinedBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchEquipmentBookings();
            await fetchEquipment();
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        if (Array.isArray(equipmentBooks) && equipmentBooks.length > 0 && Array.isArray(equipment) && equipment.length > 0) {
            const userEquipment = equipment.filter(equip => equip.user === user.username);  // This will give equipment created by user logged in
            const bookingForUserEquipment = equipmentBooks.filter(booking => userEquipment.some(equip => equip.id === booking.equipment));
            const combined = bookingForUserEquipment.map((booking) => {
                const equipmentDetails = equipment.find((equip) => equip.id === booking.equipment);
                return {
                    ...booking,
                    equipmentDetails: equipmentDetails,  // Ensure this is set correctly
                };
            }); 
            setCombinedBookings(combined);
        }
    }, [equipmentBooks, equipment, user]);

    const handleAccept = async (id) => {
        const data =await updateBookingStatus(id, 'accepted');
        toast.success(data.message || "Booking has been accepted");
        const updatedBookings = combinedBookings.map((booking) => (booking.id === id ? { ...booking, status: 'accepted' } : booking));
        setCombinedBookings(updatedBookings);
    }

    const handleReject = async (id) => {
        const response = await updateBookingStatus(id, 'rejected');
        toast.error(response.message || "Booking has been rejected");
        const updatedBookings = combinedBookings.map(booking => booking.id === id ? { ...booking, status: 'rejected' } : booking);
        setCombinedBookings(updatedBookings);
    };

    if (loading) {
        return <div className='mt-36 text-center font-semibold'>Loading.....</div>;
    }

    if (!combinedBookings || combinedBookings.length === 0) {
        return <div className='mt-36 text-center font-semibold'>No equipment bookings available.</div>;
    }


    return (
        <div className=' mt-28 p-4  flex-1 gap-4'>
            <h2 className='col-span-full text-xl font-bold mb-4'>Manage Your Equipment Bookings</h2>
            {combinedBookings.map((item) => (
                <div className="col-span-1 md:col-span-1 lg:col-span-1" key={item.id}>
                    <div className="card w-full bg-base-100 shadow-xl">
                        <img src={item.equipmentDetails?.image} alt={item.equipmentDetails?.name} className="w-full h-48 object-cover" />
                        <div className="card-body p-4">
                            <h2 className="card-title text-lg font-bold mb-2">{item.equipmentDetails?.name}</h2>
                            <p className="text-sm mb-1">Per Day Rate: Rs{item.equipmentDetails?.per_day_rate}</p>
                            <p className="text-sm mb-1">Start Date: {item.start_date}</p>
                            <p className="text-sm mb-1">End Date: {item.end_date}</p>
                            <p className="text-sm mb-1">Total Days: {item.total_date}</p>
                            <p className="text-sm mb-1">Quantity: {item.quantity}</p>
                            <p className="text-sm mb-1">Total Price: Rs{item.total_cost}</p>
                            <p className="text-sm mb-1">Applied By: {item.user}</p>
                            <p className="text-sm mb-1">Location: {item.delivery_location}</p>
                            <p className="text-sm mb-1">Booking Status: {item.status}</p>

                            <div className="card-actions justify-end mt-4">
                                {item.status === 'pending' && (
                                    <>
                                        <button className="btn btn-primary mr-2" onClick={() => handleAccept(item.id)}>Accept</button>
                                        <button className="btn btn-danger" onClick={() => handleReject(item.id)}>Reject</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default ManageEquipment;