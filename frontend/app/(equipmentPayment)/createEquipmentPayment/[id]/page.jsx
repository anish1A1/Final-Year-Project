"use client";
import React, { useState, useContext, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { EquipmentContext } from '../../../../utils/equip';

const CreateEquipmentPaymentPage = () => {
    const { createEquipmentPayment, equipmentBooks, fetchEquipmentBookings } = useContext(EquipmentContext);
    const [formData, setFormData] = useState({
        payment_method: '',
        amount: 0,
        equipment_booking: ''
    });
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            await fetchEquipmentBookings();
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (id) {
            const booking = equipmentBooks.find((booking) => booking.id === parseInt(id));
            if (booking) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    equipment_booking: id,
                    amount: booking.total_cost  // Assuming total_cost is the amount to be paid
                }));
            }
        }
    }, [id, equipmentBooks]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEquipmentPayment(formData, router, setError);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="container mt-28 p-4">
            <h2 className="text-xl font-bold mb-4">Create Equipment Payment</h2>
            
            {error && error.non_field_errors ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error.non_field_errors ?  error.non_field_errors.join(', ') :  'An error has occured'}</span>
                </div>
            ): error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            ) : null}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <select
                        name="payment_method"
                        value={formData.payment_method }
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full"
                    >
                        <option value="" disabled>Select Payment Method</option>
                        <option value="esewa">eSewa</option>
                        <option value="cash">Cash</option>
                        <option value="khalti">Khalti</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        readOnly
                        className="mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Equipment Booking ID</label>
                    <input
                        type="text"
                        name="equipment_booking"
                        value={formData.equipment_booking }
                        readOnly
                        className="mt-1 block w-full"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Payment</button>
            </form>
        </div>
    );
};

export default CreateEquipmentPaymentPage;
