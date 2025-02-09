"use client"

import React from 'react'
import PrivateRoute from '../../middleware/PrivateRoute'
import EquipmentToBookList from './dashboardEquipment/equipmentBookedList/page'

import ManageEquipment from './dashboardEquipment/ManageEquipment/page'


const DashboardPage = () => {
  return (
    <PrivateRoute>
      <div className="mt-36">
{/* 
     <ListEquipmentBookings />   */}

     Available Equipments To Accept Rent
     View More 
     <ManageEquipment />
    <br />
     Available Equipment Applied for Rent
     <EquipmentToBookList />

      </div>
    </PrivateRoute>
   
  )
}

export default DashboardPage
