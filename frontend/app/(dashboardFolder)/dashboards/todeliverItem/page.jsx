"use client";
import React, { useState, useEffect, useContext } from 'react';
import { EquipmentContext } from '../../../../utils/equip';
import { AuthContext } from '../../../../utils/auth';

const ToDeliverItem = () => {
    const { updateEquipmentDelivery, fetchEquipmentDeliveries } = useContext(EquipmentContext);
    const { user } = useContext(AuthContext);
    
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            
            await fetchEquipmentDeliveries();
        };
        fetchData();
    }, []);

  

    const handleStatusChange = (id, status) => {
        setSelectedStatus(prevState => ({
            ...prevState,
            [id]: status,
        }));
    };

    const handleDeliveryStatusSubmit = async (id) => {
        if (selectedStatus[id]) {
            await updateEquipmentDelivery(id, selectedStatus[id]);
        }
    };

    if (clearedPayments.length === 0) {
        return <div>No items to deliver</div>;
    }

    return (
        <div className="container mt-32 p-4">
            <h2 className="text-xl font-bold mb-4">Items Ready for Delivery</h2>
            {clearedPayments.map((payment) => (
                <div key={payment.id} className="card w-full bg-base-100 shadow-xl mb-4">
                    <div className="card-body p-4">
                        <h3 className="card-title text-lg font-bold mb-2">Payment ID: {payment.id}</h3>
                        <p className="text-sm mb-1">Amount: ${payment.amount}</p>
                        <p className="text-sm mb-1">Payment Method: {payment.payment_method}</p>
                        <p className="text-sm mb-1">Payment Status: {payment.status}</p>
                        <label className="block text-sm font-medium text-gray-700">Delivery Status:</label>
                        <select value={selectedStatus[payment.id] || 'processing'} onChange={(e) => handleStatusChange(payment.id, e.target.value)} className="mt-1 block w-full mb-4">
                            <option value="processing">Processing</option>
                            <option value="delivering">Delivering</option>
                            <option value="delivered">Delivered</option>
                        </select>
                        <button onClick={() => handleDeliveryStatusSubmit(payment.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ToDeliverItem;
