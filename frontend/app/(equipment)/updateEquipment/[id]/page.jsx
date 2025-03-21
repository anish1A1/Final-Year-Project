"use client"
import React, {useContext, useEffect, useState}  from 'react'
import {useParams, useRouter} from "next/navigation"
import axios from "../../../../utils/axios"
import styles from '../../../../styles/equipment.module.css';
import Link from 'next/link';
import { EquipmentContext } from '../../../../utils/equip';
import Image from 'next/image';
import { AuthContext } from '../../../../utils/auth';
import UpdateEquipmentForm from '../UpdateEquipmentForm';


const UpdateEquipment = () => {

    const router = useRouter();
    const {id} = useParams();
    const  {getEquipmentById} = useContext(EquipmentContext);
    const [initialFormData, setInitialFormData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const data = await getEquipmentById(id);
                setInitialFormData(data);
            } catch (error) {
                console.error('Error fetching equipment:', error);
                setError('Error fetching equipment details. Please try again.');
            }
        };
        fetchEquipment(); 
    }, [id]);

    const handleFormSubmit = () => {
        router.push('/equipmentList');
    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!initialFormData) {
        return <div>Loading...</div>;
    }


  return (
    <div className={styles.container}>
      <UpdateEquipmentForm 
      id = {id}
      initialFormData = {initialFormData}
      onSubmit={handleFormSubmit}
      router = {router}
      />
    </div>
  )
}

export default UpdateEquipment
