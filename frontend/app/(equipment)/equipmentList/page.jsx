"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "../../../utils/axios";
import styles from '../../../styles/equipment.module.css';
import Link from 'next/link';
import { EquipmentContext } from '../../../utils/equip';
import { AuthContext } from '../../../utils/auth';

const EquipmentList = () => {
    const { fetchEquipment, equipment, deleteEquipment, fetchEquipmentBookings, equipmentBooks } = useContext(EquipmentContext);
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [userBookings, setUserBookings] = useState([]);

    useEffect(() => {
        fetchEquipment();
        fetchEquipmentBookings();
    }, []);

    useEffect(() => {
        if (Array.isArray(equipmentBooks) && equipmentBooks.length > 0 && user) {
            const bookings = equipmentBooks.filter(booking => booking.user === user.username);
            setUserBookings(bookings);
        }
    }, [equipmentBooks, user]);

    const handleDelete = async (id) => {
        await deleteEquipment(id);
    };

    const handleUpdate = (id) => {
        router.push(`/updateEquipment/${id}`);
    };

    const handleCreateBooking = (id) => {
        router.push(`/createBooking/${id}`);
    };

    const isAlreadyBooked = (equipmentId) => {
        return userBookings.some(booking => booking.equipment === equipmentId);
    };

    return (
        <div className={styles.container}>
            <h1>Equipment List</h1>
            {user && ( <Link href="/createEquipment">
                <button className={styles.createButton}>Create Equipment</button>
            </Link>)
            }
            <div className={styles.equipmentList}>
                {equipment.map((item) => (
                    <div key={item.id} className={styles.equipmentItem}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        {item.image && (
                            <img src={`${item.image}`} alt={item.name} height={150} width={150} />
                        )}
                        <p>Per Day Rate: {item.per_day_rate}</p>
                        <p>Delivery Charge: {item.delivery_charge}</p>
                        {item.user_manual && (
                            <a href={`${item.user_manual}`} download>
                                Download User Manual
                            </a>
                        )}
                        <p>User: {item.user} </p>

                        <p>Availability Status: {item.availability_status ? 'Available' : 'Not Available'}</p>
                        <Link href={`/equipmentList/${item.id}`}>
                            <button className={styles.detailButton}>View Details</button>
                        </Link>

                        {user && item.user === user.username && (
                            <div className="">
                                <button onClick={() => handleUpdate(item.id)} className={styles.detailButton}>Update</button>
                                <button onClick={() => handleDelete(item.id)} className={styles.detailButton}>Delete</button>
                            </div>
                        )}
                        {user && item.user !== user.username && (
                            isAlreadyBooked(item.id) ? (
                                <button className={styles.detailButton} disabled>Already Booked</button>
                            ) : (
                                <button onClick={() => handleCreateBooking(item.id)} className={styles.detailButton}>Create Booking</button>
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EquipmentList;
