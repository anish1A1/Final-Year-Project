"use client";
import React, { useState, useEffect, useContext } from 'react';
import { EquipmentContext } from '../../../../../utils/equip';
import { AuthContext } from '../../../../../utils/auth';
const ToDeliverItem = () => {
    {
    const { fetchEquipmentPayment, equipmentPurchases, fetchEquipmentBookings, equipmentBooks, fetchEquipment, equipment, updateBookingStatus } = useContext(EquipmentContext);
    const { user } = useContext(AuthContext);
    const [clearedPayments, setClearedPayments] = useState([]); 

    useEffect( () => {
        const fetchData = () => {

            await fetchEquipmentPayment();
            await fetchEquipmentBookings();
            await fetchEquipment();
        }
        fetchData();
    }, [equipment, equipmentBooks, equipmentPurchases]);

    useEffect(() => {
        if (Array.isArray(equipmentPurchases) && equipmentPurchases.length > 0) {
            const clearedPayments = equipmentPurchases.filter(payment => payment.status === 'cleared');
            setClearedPayments(clearedPayments);
        }
    }, [equipmentPurchases]);
    
  return (
    <div>
      
    </div>
  )
}

export default ToDeliverItem
