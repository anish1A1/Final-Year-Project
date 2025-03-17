"use client"

import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../../../utils/cart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Truck, PackageCheck, Clock, MapPin, User, DollarSign, ShoppingCart, CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

const ProductDelivery = () => {
    const { deliveryProductOwner, fetchDeliveryProductOwner, UpdateDeliveryProductByOwner } = useContext(CartContext);

    const [updatingDeliveryId, setUpdatingDeliveryId] = useState(null);

    useEffect(() => {
        fetchDeliveryProductOwner();
    }, []);

    const OwnerLocation= "Itahari-2, Plaza Complex"
    const [selectedDates, setSelectedDates] = useState({});
    

    const handleStatusChange = async (id, newStatus) => {
        setUpdatingDeliveryId(id);
        try {
            console.log(newStatus);
            const response = await UpdateDeliveryProductByOwner(id, { status : newStatus });
            toast.success(response.message || "Trade status updated successfully!");

        } catch (error) {
        toast.error(error.message || "Failed to update Delivery status.");
            
        }
        finally{
            setUpdatingDeliveryId(null);
        }
    };

    const handleDateChange = async (id, selectedDate) => {
          if (!selectedDate) {
            toast.error("Please select a date before updating.");
            return;
          }
      
          
        
          // Ensure the date is formatted as YYYY-MM-DD
          const formattedDate = format(selectedDate, "yyyy-MM-dd");
        
          try {
            const response = await UpdateDeliveryProductByOwner(id, { handover_date: formattedDate });
            setSelectedDates(prevDates => ({ ...prevDates, [id]: selectedDates }));
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

    const statusColors = {
        pending: "border-yellow-600 text-yellow-600",
        owner_to_admin: "border-gray-600 text-gray-600",
        admin_received: "border-blue-600 text-blue-600",
        delivering_to_user: "border-blue-600 text-blue-600",
        delivered: "border-green-600 text-green-600",
        canceled: "border-red-600 text-red-600",
        
        delivered_to_admin: "border-blue-600 text-blue-600",
        delivering_to_admin: "border-green-600 text-gray-600",
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6 mt-28">

<h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        📦 Your Product To Delivery
      </h1>
      
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
            {deliveryProductOwner && deliveryProductOwner.map((item,index) => (
                <Card key={`${item.id} + ${index}`}>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Truck className="text-green-600" /> Product Delivery Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Status:</span>
                                <Badge variant="outline" className={`${statusColors[item.status] || "border-gray-600 text-gray-600"}`}>
                                    {item.status.replace(/_/g, " ").charAt(0).toUpperCase() + item.status.slice(1)}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Payment ID:</span>
                                <span className="font-medium">{item.cart_payment.id}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">User:</span>
                                <span className="font-medium flex items-center gap-2">
                                    <User className="w-4 h-4 text-blue-600" /> {item.cart_payment.user}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Provider:</span>
                                <span className="font-medium">{item.admin_username || "Not Available"}</span>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-semibold">Ordered Products</h3>
                                <ul className="list-disc pl-5 text-gray-600">
                                    {item.cart_payment.cart_name.map((product) => (
                                        <li key={product.id} className="flex items-center gap-2">
                                            <ShoppingCart className="w-4 h-4 text-purple-600" />
                                            {product.product.name} - {product.product_qty} qty
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center ">

                            <div>
                                <h3 className="text-lg font-semibold">Delivery Address</h3>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-green-600" /> {OwnerLocation}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Total Payment</h3>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-purple-600" /> {item.cart_payment.amount}
                                </p>
                            </div>
                            </div>


                            
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-gray-500">Last Updated:</span>
                                <span className="font-medium flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-yellow-600" /> {new Date(item.updated_at).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                              
                                
                                {!item.item_received_by_user && item.admin ? (
                                item.status !== 'admin_received' &&
                                item.status !== 'delivering_to_user' &&
                                item.status !== 'delivered' &&
                                item.status !== 'canceled' ? (
                    <Select
                        defaultValue={item.status}
                        onValueChange={(newValue) => handleStatusChange(item.id, newValue)}
                    >
                        <SelectTrigger className="w-full border-gray-300 shadow-sm">
                            <SelectValue placeholder="Change Status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="delivering_to_admin">Delivering To Admin</SelectItem>
                            <SelectItem value="delivered_to_admin">Delivered To Admin</SelectItem>
                        </SelectContent>
                    </Select>
                    ) : null
                ) : null}
        
            {updatingDeliveryId === item.id && <p className="text-blue-500 mt-2">Updating...</p>}       

        <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full flex items-center gap-3 text-lg px-4 py-2 border-gray-300 shadow-sm rounded-lg bg-green-600 hover:bg-green-700 text-white">
                          <CalendarIcon /> {selectedDates[item.id] ? format(selectedDates[item.id], "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDates[item.id]}
                          onSelect={(date) => handleDateChange(item.id, date)}
                          disabled={(day) => day < new Date()}
                        />
                      </PopoverContent>
                    </Popover>                    
            </div>
               </div>
            </CardContent>
                </Card>
            ))}
            </div>
        </div>
    );
};

export default ProductDelivery;
