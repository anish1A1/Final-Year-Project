'use client'
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from 'next/navigation';
import axios from "../../../../utils/axios"
import styles from '../../../../styles/equipment.module.css';
import { EquipmentContext } from '../../../../utils/equip';

const EquipmentDetail = () => {
    const [equipment, setEquipment] = useState(null);
    const {getEquipmentById} = useContext(EquipmentContext);
    const router = useRouter();
   
    const { id } = useParams();  // Use useParams to get route parameters
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const data = await getEquipmentById(id);
                    setEquipment(data);
                } catch (error) {
                    console.error('Error fetching equipment details:', error);
                }
            };
            fetchData();
        }
    }, [id]);

    if (!equipment) {
        return <div>Loading...</div>;
    }

    return(
        <div className={styles.container}>
            <h1>{equipment.name}</h1>
            <p>{equipment.description}</p>
            {equipment.image && (
                <img src={`${equipment.image}`} alt={equipment.name} />
            )}
            <p>Per Day Rate: {equipment.per_day_rate}</p>
            <p>Delivery Charge: {equipment.delivery_charge}</p>
            {equipment.user_manual && (
                <a href={`{equipment.user_manual}`} download>
                    Download User Manual
                </a>
            )}
            <p>Availability Status: {equipment.availability_status ? 'Available' : 'Not Available'}</p>
            <p>User: {equipment.user}</p>

            <button onClick={() => router.back()}>Back to Equipment List</button>
        </div>

    );
};

export default EquipmentDetail;