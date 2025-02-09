"use client";
import React, {useState, useContext, useEffect} from 'react'

import styles from '../../../styles/equipment.module.css';
import { EquipmentContext } from '../../../utils/equip';
const UpdateEquipmentForm = ({id, initialFormData, onSubmit, router}) => {

    const [formData, setFormData] = useState(initialFormData);
    const {updateEquipment} = useContext(EquipmentContext);

    useEffect(() => {
        if (initialFormData) {
            setFormData(initialFormData);
        }
    }, [initialFormData]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        const {name, files} = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEquipment(id, formData, router);
        } catch (error) {
            console.error('Error: while updating equipment', error);
        }
    };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Image:</label>
                <input type="file" name="image" onChange={handleFileChange} />
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
                <input type="number" step="0.01" name="per_day_rate" value={formData.per_day_rate} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>User Manual:</label>
                <input type="file" name="user_manual" onChange={handleFileChange} />
            </div>
            <div className={styles.formGroup}>
                <label>Delivery Charge:</label>
                <input type="number" step="0.01" name="delivery_charge" value={formData.delivery_charge} onChange={handleChange} required />
            </div>
            <button type="submit" className={styles.submitButton}>Update Equipment</button>
        </form>
  )
}

export default UpdateEquipmentForm
