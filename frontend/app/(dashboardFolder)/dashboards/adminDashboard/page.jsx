"use client";

import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../../utils/cart";
import { AuthContext } from "../../../../utils/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw, MapPin, CheckCircle, User, Truck, CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

const statusColors = {
  pending: "bg-yellow-500",
  owner_to_admin: "bg-gray-500",
  admin_received: "bg-blue-500",
  delivering_to_user: "bg-blue-500",
  delivered: "bg-green-500",
  canceled: "bg-red-500",
};


const AdminDashboard = () => {
  const { fetchCartDeliveriesForAdmin, addAdminToCartDelivery, cartDeliveriesForAdmin, updateCartDeliveryByAdmin, loading } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [updatingDeliveryId, setUpdatingDeliveryId] = useState(null);
  const [date, setDate] = React.useState(null);


  useEffect(() => {
    fetchCartDeliveriesForAdmin();
  }, [user]);

  const handleStatusChange = async (id, newStatus, admin) => {

    if (admin === null){
      toast.error("Please Apply First to update delivery status");
      return;
    }
    setUpdatingDeliveryId(id);
    try {
      const response = await updateCartDeliveryByAdmin(id, { status: newStatus });
      toast.success(response.message || "Delivery status updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update delivery status.");
    } finally {
      setUpdatingDeliveryId(null);
    }
  };

  const handleDateChange = async (id) => {
    if (!date) {
      toast.error("Please select a date before updating.");
      return;
    }
  
    // Ensure the date is formatted as YYYY-MM-DD
    const formattedDate = format(date, "yyyy-MM-dd");
  
    try {
      const response = await updateCartDeliveryByAdmin(id, { delivery_date: formattedDate });
      toast.success(response.message || "Delivery date updated successfully!");
    } catch (error) {
      // Check if backend sends validation error
      if (error.response && error.response.data && error.response.data.delivery_date) {
        toast.error(error.response.data.delivery_date[0]); 
      } else {
        toast.error(error.message || "Failed to update the delivery date.");
      }
    }
  };
  

  const handleAddAdmin= async (id) => {
    // console.log(`Adding ${id}`);

    try {
        await addAdminToCartDelivery(id, user);
        toast.success("Admin added to cart delivery!");
    } catch (error) {
        toast.error(error.message || "Something error occured!.");
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">📦 Admin Product Deliveries</h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>
      ) : cartDeliveriesForAdmin.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartDeliveriesForAdmin.map((delivery) => (
            <Card key={delivery.id} className="bg-white p-5 rounded-xl shadow-lg hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-blue-600" />
                  Delivery ID: {delivery.id}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4 text-green-600" />
                  <strong>Customer:</strong> {delivery.cart_payment.user.charAt(0).toUpperCase() + delivery.cart_payment.user.slice(1)}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <strong>Delivery Location:</strong> {delivery.cart_payment.delivery_address}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-500" />
                  <strong>Item Received By User:</strong> {delivery.item_received_by_user ? "Yes ✅" : "No ❌"}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-purple-500" />
                  <strong>Last Updated:</strong> {new Date(delivery.updated_at).toLocaleString()}
                </p>

                <div className="mt-4">
                  <Badge className={`text-white py-1 px-3 rounded-lg ${statusColors[delivery.status]}`}>{
                    delivery.status.replace(/_/g, " ").toUpperCase()
                  }</Badge>
                </div>

                {/* Status Update Dropdown */}
                {delivery.item_received_by_user === false && (
                  <div className="mt-4">
                    <Select
                      defaultValue={delivery.status}
                      onValueChange={(newStatus) => handleStatusChange(delivery.id, newStatus, delivery.admin)}
                    >
                      <SelectTrigger className="w-full border-gray-300 shadow-sm">
                        <SelectValue placeholder="Change Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner_to_admin">Owner to Admin</SelectItem>
                        <SelectItem value="admin_received">Admin Received</SelectItem>
                        <SelectItem value="delivering_to_user">Delivering to User</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                )}
                {updatingDeliveryId === delivery.id && <p className="text-blue-500 mt-2">Updating...</p>}


                <div className="mt-4 flex flex-col gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <CalendarIcon /> {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(day) => day < new Date()} // Prevents selecting past dates
                    />
                  </PopoverContent>
                </Popover>

                  <Button className="bg-green-600 text-white" onClick={() => handleDateChange(delivery.id)}>Update Date</Button>
              </div>

              {delivery.delivery_date && (
                  <div className="mt-4">
                      <p className="text-gray-600 flex items-center gap-2">
                          <strong>Delivery Date:</strong> {format(new Date(delivery.delivery_date), "PPP")}
                      </p>
                  </div>
              )}

                {delivery.admin === null ? (
                  <>
                  Apply For Delivery <button className="p-3 bg-blue-200"
                  onClick={() =>handleAddAdmin(delivery.id)}
                  > Apply </button>
                  </>

                ): (
                  <div className="mt-4">
                    <p className="text-gray-600 flex items-center gap-2">
                      <User className="w-4 h-4 text-green-600" />
                      <strong>Admin:</strong> {delivery.admin_username.charAt(0).toUpperCase() + delivery.admin_username.slice(1)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-lg font-semibold text-gray-800 text-center">No pending deliveries found.</p>
      )}
    </div>
  );
};


export default AdminDashboard;
