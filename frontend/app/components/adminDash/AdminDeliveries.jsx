"use client"
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../utils/auth";
import { CartContext } from "../../../utils/cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw, MapPin, CheckCircle, User, Truck, CalendarIcon, UsersRound , Clock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns"


import { Calendar } from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"


const statusColors = {
  pending: "bg-yellow-500",
  owner_to_admin: "bg-gray-500",
  admin_received: "bg-blue-500",
  delivering_to_user: "bg-pink-600",
  delivered: "bg-green-500",
  canceled: "bg-red-500",
};



const AdminDeliveries = () => {
    const { fetchCartDeliveriesForAdmin, addAdminToCartDelivery, cartDeliveriesForAdmin, updateCartDeliveryByAdmin, loading } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [updatingDeliveryId, setUpdatingDeliveryId] = useState(null);
    const [date, setDate] = useState(null);
    const [locationInputs, setLocationInputs] = useState({}); // Store input values for each trade
    const [savingLocationId, setSavingLocationId] = useState(null); // Track saving state for location
  
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
  
    const handleDateChange = async (id, admin) => {
      if (!date) {
        toast.error("Please select a date before updating.");
        return;
      }
  
      if (admin === null){
        toast.error("Please Apply First to update delivery date");
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
  
     const handleLocationChange = (id, value) => {
        setLocationInputs((prev) => ({
          ...prev,
          [id]: value,
        })
        );
      };
    
      const saveLocation = async (id, admin) => {
        if (admin === null){
          toast.error("Please Apply First to update delivery location");
          return;
        }
        if (!locationInputs[id]) return;
        setSavingLocationId(id);
        try {
          const data = await updateCartDeliveryByAdmin(id, { delivery_location : locationInputs[id] });
          console.log(locationInputs[id]);
          toast.success(data.message || "Location updated successfully!");
        } catch (error) {
          toast.error(error.message || "Failed to update location.");
          console.error("Failed to update location:", error);
        } finally {
          setSavingLocationId(null);
        //   setLocationInputs(null); 
        }
      };
    
  
    const handleAddAdmin = async (id) => {
      // console.log(`Adding ${id}`);
  
      try {
          await addAdminToCartDelivery(id, user);
          toast.success("Admin added to cart delivery!");
      } catch (error) {
          toast.error(error.message || "Something error occured!.");
      }
    };
  
  
    
  
    return (
        <div className="mt-16  p-8 pt-11 bg-gray-50 min-h-screen">
        {/* <BreadCrumbs /> */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          📦 Admin Product Deliveries
        </h1>
      
        {loading ? (
          <div className="flex justify-center items-center h-screen text-lg font-medium text-gray-600">
            Loading...
          </div>
        ) : cartDeliveriesForAdmin.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cartDeliveriesForAdmin.map((delivery) => (
              <Card
                key={delivery.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-gray-800 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    Delivery ID: {delivery.id}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600 flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-green-600" />
                    <strong>Customer:</strong>{" "}
                    {delivery.cart_payment.user.charAt(0).toUpperCase() +
                      delivery.cart_payment.user.slice(1)}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <strong>Delivery Location:</strong>{" "}
                    {delivery.cart_payment.delivery_address}
                  </p>
      
                  <div>
                    <p className="text-gray-600 flex items-center gap-2 text-sm">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <strong>Product Item Location:</strong>{" "}
                      {delivery.delivery_location || "Not available"}
                    </p>
                    {delivery.item_received_by_user === false && (
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          type="text"
                          placeholder="Enter new location"
                          value={locationInputs[delivery.id] || ""}
                          onChange={(e) =>
                            handleLocationChange(delivery.id, e.target.value)
                          }
                          className="w-full border-gray-300 shadow-sm rounded-md text-sm"
                        />
                        <Button
                          onClick={() => saveLocation(delivery.id, delivery?.admin)}
                          disabled={savingLocationId === delivery.id}
                          className="bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600 transition text-sm"
                        >
                          {savingLocationId === delivery.id ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    )}
                  </div>
      
                  <Badge
                    className={`text-white  px-3 rounded-md text-xs font-semibold ${statusColors[delivery.status]}`}
                  >
                    {delivery.status.replace(/_/g, " ").toUpperCase()}
                  </Badge>
      
                  {delivery.item_received_by_user === false && (
                    <div className="mt-3">
                      <Select
                        defaultValue={delivery.status}
                        onValueChange={(newStatus) =>
                          handleStatusChange(delivery.id, newStatus, delivery.admin)
                        }
                      >
                        <SelectTrigger className="w-full border-gray-300 shadow-sm rounded-md text-sm">
                          <SelectValue placeholder="Change Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner_to_admin">
                            Owner to Admin
                          </SelectItem>
                          <SelectItem value="admin_received">
                            Admin Received
                          </SelectItem>
                          <SelectItem value="delivering_to_user">
                            Delivering to User
                          </SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {updatingDeliveryId === delivery.id && (
                    <p className="text-blue-500 mt-2 text-sm">Updating...</p>
                  )}
      
                  <div className="mt-3 flex flex-col gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full flex items-center gap-2 text-sm px-3 py-1 border-gray-300 shadow-sm rounded-md"
                        >
                          <CalendarIcon />{" "}
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(day) => day < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <Button
                      className="bg-green-600 text-white rounded-md px-3 py-1 hover:bg-green-700 transition text-sm"
                      onClick={() =>
                        handleDateChange(delivery.id, delivery?.admin)
                      }
                    >
                      Update Date
                    </Button>
                  </div>
      
                  {delivery.delivery_date && (
                    <p className="text-gray-600 text-sm mt-2">
                      <strong>Delivery Date:</strong>{" "}
                      {format(new Date(delivery.delivery_date), "PPP")}
                    </p>
                  )}
      
                  {delivery.admin === null ? (
                    <div className="mt-3">
                      <p className="text-gray-700 font-medium text-sm">
                        Apply for Delivery
                      </p>
                      <Button
                        className="bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600 transition text-sm"
                        onClick={() => handleAddAdmin(delivery.id)}
                      >
                        Apply
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm mt-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-green-600" />{" "}
                      <strong>Admin:</strong>{" "}
                      {delivery.admin_username.charAt(0).toUpperCase() +
                        delivery.admin_username.slice(1)}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-lg font-medium text-gray-800 text-center">
            No pending deliveries found.
          </p>
        )}
      </div>
      
    );
  };
  
  
  export default AdminDeliveries;
  