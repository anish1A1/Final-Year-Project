"use client";
import React from 'react';
import PrivateRoute from '../../middleware/PrivateRoute';
import EquipmentToBookList from './dashboardEquipment/equipmentBookedList/page';
import ManageEquipment from './dashboardEquipment/ManageEquipment/page';
import ToReceiveItem from './dashboardEquipment/ToReceiveItem/page';

import Link from 'next/link';
import GetConfirmedTradesByOwner from '../../components/Deliveries/GetConfirmedTradesByOwner';

const DashboardPage = () => {
  return (
    <PrivateRoute>
      <div className="mt-36">
        Available Equipments To Accept Rent
        View More
        <Link href="/dashboards/dashboardEquipment/ManageEquipment" className='btn btn-primary p-6 bg-slate-600 rounded'>
          Manage Your Equipment being booked
        </Link>
        <ManageEquipment />
        <br />
        Available Equipment Applied for Rent
        <Link href="/dashboards/dashboardEquipment/equipmentBookedList" className='btn btn-primary p-6 bg-slate-600 rounded'>
          Manage Your Equipment Applied For Rent
        </Link>
        <EquipmentToBookList />
        <br />
        <Link href="/dashboards/dashboardEquipment/todeliverItem" className='btn btn-primary p-6 bg-slate-600 rounded'>
          Go to Deliver Items
        </Link>
<br />
<br />
<br />
        <Link href="/dashboards/dashboardEquipment/ToReceiveItem" className='btn btn-primary p-6 bg-slate-600 rounded'>
          Go To page for Receiving Item
        </Link>

        <div className="mt-8">
          <p>Your Deliveries</p>
          <GetConfirmedTradesByOwner />

        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardPage;
