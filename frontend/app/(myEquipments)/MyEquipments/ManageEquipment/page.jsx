"use client";
import React, { useState, useEffect, useContext } from 'react';
import { EquipmentContext } from '../../../../utils/equip';
import { AuthContext } from '../../../../utils/auth';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Layers,CreditCard, DollarSign, User } from "lucide-react";

const ManageEquipment = () => {
    const { fetchEquipmentBookings, equipmentBooks, loading, fetchEquipment, equipment, updateBookingStatus } = useContext(EquipmentContext);
    const { user } = useContext(AuthContext);
    const [combinedBookings, setCombinedBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchEquipmentBookings();
            await fetchEquipment();
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        if (Array.isArray(equipmentBooks) && equipmentBooks.length > 0 && Array.isArray(equipment) && equipment.length > 0) {
            const userEquipment = equipment.filter(equip => equip.user === user.username);  // This will give equipment created by user logged in
            const bookingForUserEquipment = equipmentBooks.filter(booking => userEquipment.some(equip => equip.id === booking.equipment));
            const combined = bookingForUserEquipment.map((booking) => {
                const equipmentDetails = equipment.find((equip) => equip.id === booking.equipment);
                return {
                    ...booking,
                    equipmentDetails: equipmentDetails,  // Ensure this is set correctly
                };
            }); 
            setCombinedBookings(combined);
        }
    }, [equipmentBooks, equipment, user]);

    const handleAccept = async (id) => {
        const data =await updateBookingStatus(id, 'accepted');
        toast.success(data.message || "Booking has been accepted");
        const updatedBookings = combinedBookings.map((booking) => (booking.id === id ? { ...booking, status: 'accepted' } : booking));
        setCombinedBookings(updatedBookings);
    }

    const handleReject = async (id) => {
        const response = await updateBookingStatus(id, 'rejected');
        toast.error(response.message || "Booking has been rejected");
        const updatedBookings = combinedBookings.map(booking => booking.id === id ? { ...booking, status: 'rejected' } : booking);
        setCombinedBookings(updatedBookings);
    };

    if(loading){
        return <div className="flex justify-center items-center mt-36 text-2xl font-semibold text-gray-700">Loading...</div>
      };

    if (!combinedBookings || combinedBookings.length === 0) {
        return <div className="flex justify-center items-center mt-36 text-2xl font-semibold text-gray-700">No equipment bookings available.</div>;
    };


    return (
        <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Manage Your Equipments
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {combinedBookings &&
            combinedBookings.map((item) => (
              <Card
                key={item.id}
                className="bg-white shadow-md rounded-lg transition-transform transform hover:shadow-lg hover:-translate-y-1 border border-gray-200"
              >
                {/* Card Header */}
                <div className="relative">
                  <img
                    src={item.equipmentDetails?.image}
                    alt={item.equipmentDetails?.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                </div>
      
                {/* Card Content */}
                <CardContent className="p-4 space-y-4">
                  {/* Equipment Name */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">
                      {item.equipmentDetails?.name}
                    </h2>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        item.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : item.status === "accepted"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
      
                  {/* Booking Details */}
                  <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <i className="text-blue-600">
                        <CalendarDays className="w-4 h-4" />
                      </i>
                      <strong>Start:</strong> {item.start_date}
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="text-blue-600">
                        <CalendarDays className="w-4 h-4" />
                      </i>
                      <strong>End:</strong> {item.end_date}
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="text-green-500">
                        <Layers className="w-4 h-4" />
                      </i>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="text-orange-500">
                        <DollarSign className="w-4 h-4" />
                      </i>
                      <strong>Rate:</strong> Rs {item.equipmentDetails?.per_day_rate}
                    </p>
                    <p className="col-span-2 flex items-center gap-2">
                      <i className="text-red-500">
                        <CreditCard className="w-4 h-4" />
                      </i>
                      <strong>Total Price:</strong> Rs {item.total_cost}
                    </p>
                  </div>
      
                  {/* User and Location Details */}
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Applied By:</strong>{" "}
                      {item.user.charAt(0).toUpperCase() + item.user.slice(1)}
                    </p>
                    <p>
                      <strong>Location:</strong> {item.delivery_location}
                    </p>
                  </div>
      
                  {/* Action Buttons */}
                  {item.status === "pending" && (
                    <div className="flex justify-end mt-4 space-x-2">
                      <button
                        className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition"
                        onClick={() => handleAccept(item.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition"
                        onClick={() => handleReject(item.id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
      
      
        
    );
}
export default ManageEquipment;