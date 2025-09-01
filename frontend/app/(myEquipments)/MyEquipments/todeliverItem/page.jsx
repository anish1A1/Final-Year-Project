"use client";
import React, { useState, useEffect, useContext } from 'react';
import { EquipmentContext } from '../../../../utils/equip';
import { AuthContext } from '../../../../utils/auth';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Truck, Package, RefreshCcw } from "lucide-react";
import { toast } from 'sonner';
import axios from '@/utils/axios';

const ToDeliverItem = () => {
    const { fetchEquipmentDeliveries, deliveries, loading, updateEquipmentDelivery, fetchEquipmentBookings, fetchEquipment, equipmentBooks, equipment   } = useContext(EquipmentContext);
    const { user } = useContext(AuthContext);
  
    const [selectedStatus, setSelectedStatus] = useState({});
    const [userDeliveries, setUserDeliveries] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            await fetchEquipmentDeliveries();
            await fetchEquipmentBookings();
            await fetchEquipment();
        }
        fetchData();
    }, [ ]);

    const handleStatusChange = (id, status) => {
        setSelectedStatus(prevState => ({
            ...prevState,
            [id]: status,
        }));
    };
    
    const handleDeliveryStatusSubmit = async (id) => {
        if (selectedStatus[id]) {
          try {
            const updatedDelivery = await updateEquipmentDelivery(id, selectedStatus[id]);
            if (updatedDelivery) {
                setUserDeliveries(userDeliveries.map(delivery => 
                    delivery.id === id ? { ...delivery, status: updatedDelivery.status } : delivery
                ));
            }
            await fetchEquipmentDeliveries();
            toast.success(updatedDelivery.message);
            
          } catch (error) {
            toast.error(error.message);
          }
        }
    };

      const handleEquipmentReceivedback = async (id) => {
          try {
            const response = await axios.patch(`/api/equipment-delivery/${id}/`, {
                equipment_received_by_owner: true
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response) {
              toast.success("Yay! You got your equipment back");
            }
            await fetchEquipmentDeliveries();
          } catch (error) {
            toast.error(error?.message || 'Failed to Update the Delivery Status');
          }
      }
    
    const getBookingDetails = (bookingId) => {
        const bookingCaught = equipmentBooks.find(booking => booking.id === bookingId) || {};
        const bookedEquipment = equipment.find(equip => equip.id === bookingCaught.equipment) || {};

        return {
            bookingCaught,
            equipment: bookedEquipment
        };
    };

    if(loading){
        return <div className="flex justify-center items-center mt-36 text-2xl font-semibold text-gray-700">Loading...</div>
      };
   

    return (
        
        
        <div className="container mx-auto p-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          <Package className="inline-block w-8 h-8 text-blue-600 mr-2" /> Items Ready for Delivery
        </h2>
  
        {deliveries.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 text-2xl font-semibold text-gray-700">
            <Truck className="w-16 h-16 text-gray-400 mb-4" />
            No items to deliver
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {deliveries.map((delivery) => {
              const { bookingCaught, equipment: bookedEquipment } = getBookingDetails(
                delivery.equipment_payment.equipment_booking
              );
              return (
                <Card
                  key={delivery.id}
                  className="bg-white shadow-lg rounded-xl transition-transform transform hover:shadow-xl hover:-translate-y-1 border border-gray-300"
                >
                  <CardHeader className="p-5 border-b flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Package className="w-6 h-6 text-blue-600" /> Delivery ID: {delivery.id}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      Status: 
                      <span
                        className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-1 ${
                            delivery.status === "processing"
                              ? "bg-yellow-100 text-yellow-600"
                              : delivery.status === "delivering"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                          }`}
                      >
                        {delivery.status === "processing" && <RefreshCcw className="w-4 h-4" />}
                        {delivery.status === "delivering" && <Truck className="w-4 h-4" />}
                        {delivery.status === "delivered" && <CheckCircle className="w-4 h-4" />}
                        {delivery.status}
                      </span>
                    </p>
                  </CardHeader>
  
                  <CardContent className="p-5 space-y-3 text-gray-700">
                    <p><strong>Payment ID:</strong> {delivery.equipment_payment.id}</p>
                    <p><strong>User:</strong> {delivery.equipment_payment.user}</p>
                    <p><strong>Equipment:</strong> {bookedEquipment?.name || "N/A"}</p>
                    <div className="grid grid-cols-2 gap-x-4">
                      <p><strong>Quantity:</strong> {bookingCaught?.quantity || "N/A"}</p>
                      <p><strong>Location:</strong> {bookingCaught?.delivery_location || "N/A"}</p>
                      <p><strong>Start Date:</strong> {bookingCaught?.start_date || "N/A"}</p>
                      <p><strong>End Date:</strong> {bookingCaught?.end_date || "N/A"}</p>
                    </div>
                    <p><strong>Total Days:</strong> {bookingCaught?.total_date || "N/A"}</p>
                    <p><strong>Date Paid:</strong> {delivery.equipment_payment?.date_paid || "N/A"}</p>
                          {delivery.status !== "delivered" ? (
                            
                            <p className='text-sm font-medium text-center text-gray-700'>Please Deliver the equipment before start Date</p>
                          ):null}
                  </CardContent>
  
                  <CardFooter className="p-5 border-t bg-gray-50 rounded-b-xl space-x-5 flex items-center">
                    {delivery.equipment_received === true ? (
                      <div>
                      <p className="px-3 py-1.5 mx-20 text-sm font-semibold rounded-full flex items-center  gap-2 bg-green-100 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        The user has Received this item
                      </p>

                      {new Date(bookingCaught?.end_date) > new Date() ? (
                        <div className='pt-4 flex justify-center gap-4 items-center'>
                        <p className='text-sm font-medium text-center text-gray-700'>Item Returned to You: {delivery?.equipment_received_by_owner ? "Yes" : "No"}</p>
                        {delivery?.equipment_received_by_owner === false ? (
                        <button
                          onClick={() => handleEquipmentReceivedback(delivery.id)}
                          className="w-28 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg transition flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5" /> Yes
                        </button>
                          
                        ) : null}
                        </div>
                      ) : null}

                      </div>
                    ): (
                      <>
                      
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status:
                    </label>
                    <select
                      value={selectedStatus[delivery.id] || delivery.status}
                      onChange={(e) => handleStatusChange(delivery.id, e.target.value)}
                      className="block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                    >
                      <option value="processing">Processing</option>
                      <option value="delivering">Delivering</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    <button
                      onClick={() => handleDeliveryStatusSubmit(delivery.id)}
                      className="w-28 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" /> Submit
                    </button>
                      
                      </>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }

export default ToDeliverItem;
