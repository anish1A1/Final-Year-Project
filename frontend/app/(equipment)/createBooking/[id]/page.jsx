"use client";
import React, {useContext, useEffect, useState} from 'react';
import {useRouter, useParams} from "next/navigation";
import styles from '../../../../styles/equipment.module.css';
import { EquipmentContext } from '../../../../utils/equip';

const CreateEquipmentBooking = () => {
    const { id } = useParams();  // Get the equipment ID from the URL
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        delivery_location: "",
        quantity: 0,
        equipment: id,  // Set the initial equipment ID
    });
    const [maxQuantity, setMaxQuantity] = useState(0);

    const router = useRouter();
    const { createEquipmentBookings, fetchEquipment, equipment } = useContext(EquipmentContext);

    useEffect(() => {
        const fetchEquipmentDetails = async () => {
            await fetchEquipment();
        };
        fetchEquipmentDetails();
    }, []);

    useEffect(() => {
        if (Array.isArray(equipment) && equipment.length > 0) {
            const equipmentDetails = equipment.find(equip => equip.id === parseInt(id));
            if (equipmentDetails) {
                setMaxQuantity(equipmentDetails.quantity);
            }
        }
    }, [equipment, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEquipmentBookings(formData, router);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Create Equipment Booking</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Start Date:</label>
                    <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>End Date:</label>
                    <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Delivery Location:</label>
                    <input type="text" name="delivery_location" value={formData.delivery_location} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Quantity (Max: {maxQuantity}):</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        max={maxQuantity}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Create Booking</button>
            </form>
        </div>
    );
};

export default CreateEquipmentBooking;
