"use client";
import React, { useState, useContext } from 'react';
import { useRouter } from "next/navigation";
import styles from '../../../styles/equipment.module.css';
import { EquipmentContext } from '../../../utils/equip';
import { AuthContext } from "../../../utils/auth";


const CreateEquipment = () => {
    const [formData, SetFormData] = useState({
        name: "",
        description: "",
        image: null,
        availability_status: true,
        quantity: 0,
        per_day_rate: 0,
        user_manual: null,
        delivery_charge: 0,
    });
    const { createEquipment } = useContext(EquipmentContext);  // Use useContext to access the context values
   // const { user } = useContext(AuthContext);   // Since we also need to pass the user as it is required in the model
    const router = useRouter();  

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        SetFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        SetFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEquipment(formData, router);  // Use createEquipment from the context
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Create Equipment</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' required />
                </div>

                <div className={styles.formGroup}>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' required />
                </div>

                <div className={styles.formGroup}>
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleFileChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                </div>

                <div className={styles.formGroup}>
                    <label>Availability Status:</label>
                    <input type="checkbox" name="availability_status" checked={formData.availability_status} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Quantity:</label>
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label>Per Day Rate:</label>
                    <input type="number" step="1" name="per_day_rate" value={formData.per_day_rate} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label>User Manual:</label>
                    <input type="file" name="user_manual" onChange={handleFileChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Delivery Charge:</label>
                    <input type="number" step="1" name="delivery_charge" value={formData.delivery_charge} onChange={handleChange} required />
                </div>

                <button type="submit" className={styles.submitButton}>Create Equipment</button>   
            </form>
        </div>
    );
};

export default CreateEquipment;
