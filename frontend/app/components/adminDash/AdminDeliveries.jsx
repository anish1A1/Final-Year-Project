"use client"
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../utils/auth";
import { CartContext } from "../../../utils/cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";

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
        <div className="mt-16  bg-gray-50 container mx-auto py-6">
            {/* <BreadCrumbs /> */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">📦 Admin Product Deliveries</h1>
  
        {loading ? (
          <div className="flex justify-center items-center h-[60vh] text-xl font-medium text-gray-600">Loading...</div>
        ) : cartDeliveriesForAdmin.length > 0 ? (
           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cartDeliveriesForAdmin.map((delivery) => (
            <Card
              key={delivery.id}
              className="rounded-xl border border-gray-200 shadow-md transition hover:shadow-lg"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                  <Truck className="w-5 h-5 text-blue-600" />
                  Delivery #{delivery.id}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-600" />
                  <span>
                    <strong>Customer:</strong>{" "}
                    {delivery.cart_payment.user.charAt(0).toUpperCase() +
                      delivery.cart_payment.user.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>
                    <strong>Address:</strong>{" "}
                    {delivery.cart_payment.delivery_address}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-yellow-500" />
                  <span>
                    <strong>Item Location:</strong>{" "}
                    {delivery.delivery_location || "Not Available"}
                  </span>
                </div>

                {delivery.item_received_by_user === false && (
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="New location"
                      value={locationInputs[delivery.id] || ""}
                      onChange={(e) =>
                        handleLocationChange(delivery.id, e.target.value)
                      }
                      className="flex-1"
                    />
                    <Button
                      onClick={() => saveLocation(delivery.id, delivery?.admin)}
                      disabled={savingLocationId === delivery.id}
                      className="bg-blue-600 text-white"
                    >
                      {savingLocationId === delivery.id ? "Saving..." : "Save"}
                    </Button>
                  </div>
                )}

                <Badge
                  className={`w-fit text-xs px-3 py-1 font-medium rounded-full ${statusColors[delivery.status]}`}
                >
                  {delivery.status.replace(/_/g, " ").toUpperCase()}
                </Badge>

                {delivery.item_received_by_user === false && (
                  <Select
                    defaultValue={delivery.status}
                    onValueChange={(newStatus) =>
                      handleStatusChange(delivery.id, newStatus, delivery.admin)
                    }
                  >
                    <SelectTrigger className="w-full mt-2">
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
                )}
                {updatingDeliveryId === delivery.id && (
                  <p className="text-blue-500 text-sm">Updating...</p>
                )}

                <div className="pt-3 space-y-2">
                  {delivery.item_received_by_user === false ? (
                    <>
                    
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
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
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() =>
                      handleDateChange(delivery.id, delivery?.admin)
                    }
                  >
                    Update Date
                  </Button>
                    </>
                  ): (
                    <p className="text-gray-600 text-md font-bold py-16  text-center">
                     The item has been received by the user
                    </p>
                  )}
                </div>

                {delivery.delivery_date && (
                  <p className="text-gray-600 text-sm">
                    <strong>Delivery Date:</strong>{" "}
                    {format(new Date(delivery.delivery_date), "PPP")}
                  </p>
                )}

                {delivery.admin === null ? (
                  <div className="pt-3">
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      Apply for Delivery
                    </p>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleAddAdmin(delivery.id)}
                    >
                      Apply
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pt-2 text-sm">
                    <User className="w-4 h-4 text-green-600" />
                    <strong>Admin:</strong>{" "}
                    {delivery.admin_username.charAt(0).toUpperCase() +
                      delivery.admin_username.slice(1)}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 text-lg font-medium">
          No pending deliveries found.
        </p>
      )}
    </div>
  );
};

export default AdminDeliveries;