"use client"
import React, {useState, useEffect, useContext} from 'react'

import { CartContext } from '../../../../utils/cart'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { Switch } from "@/components/ui/switch";
  import { Package, MapPin, RotateCcw, CheckCircle , DollarSign, User} from "lucide-react";
  import { toast } from "sonner";
import { AuthContext } from '../../../../utils/auth';

const statusColors = {
    pending: "bg-yellow-500",
    owner_to_admin: "bg-gray-500",
    admin_received: "bg-blue-500",
    delivering_to_user: "bg-blue-500",
    delivered: "bg-green-500",
    canceled: "bg-red-500",
  };
  
const UserCartDelivery = () => {
    const {fetchCartDeliveries, cartDeliveries, loading} = useContext(CartContext);
    const [updatingDeliveryId, setUpdatingDeliveryId] = useState(null);
    const {user} = useContext(AuthContext);

      useEffect(() => {
        fetchCartDeliveries();
      }, [user]);


  return (
    <div className="mt-8 p-6 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            📦 Your Confirmed Trades
          </h1>
    
          {loading ? (
            <div className="flex justify-center items-center h-screen text-xl font-semibold">
              Loading...
            </div>
          ) : cartDeliveries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartDeliveries.map((items) => (
                <Card
                  key={items.id}
                  className="bg-white p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <Package className="w-6 h-6 text-blue-600" />
                      Delivery of Cart ID: {items.cart_payment.id}
                    </CardTitle>
                  </CardHeader>
    
                  <CardContent>
                    {/* Delivery Location */}
                    <p className="text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <strong>Delivery Location:</strong> {items.cart_payment.delivery_address || "Not available"}
                    </p>
    
                    {/* Item Location */}
                    <p className="text-gray-600 flex items-center gap-2 mt-2">
                      <strong>Item Location:</strong> {items.delivery_location || "Not available"}
                    </p>
    
                    {/* Item Received */}
                    {items.status === "delivered" && (
                      <div className="mt-4 bg-gray-100 p-3 rounded-lg">
                        <p className="text-gray-600 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-yellow-500" />
                          <strong>Item Received:</strong>
                        </p>
                        <div className="flex items-center gap-2 mt-2 pr-4">
                            {items.item_received_by_user === false ?(
                                <Switch
                                  checked={items.item_received_by_user}
                                  onCheckedChange={(newValue) => handleItemReceivedChange(items.id, newValue)}
                                  disabled={updatingDeliveryId === items.id}
                                />
    
                            ) : null}
                          <span>
                            {items.item_received_by_user ? "Yes ✅" : "No ❌"}
                          </span>
                        </div>
                        {updatingDeliveryId === items.id && (
                          <p className="text-blue-500 text-sm mt-2">Updating...</p>
                        )}
                      </div>
                    )}
    
                    {/* Last Updated */}
                    <p className="text-gray-600 flex items-center gap-2 mt-2">
                      <RotateCcw className="w-4 h-4 text-purple-500" />
                      <strong>Last Updated:</strong> {new Date(items.updated_at).toLocaleString()}
                    </p>

                    <p className="text-gray-600 flex items-center gap-2 mt-2">
                      <DollarSign className="w-4 h-4 text-purple-500" />
                      <strong>Total Payment:</strong> {items.cart_payment.amount}
                    </p>

                    <p className="text-gray-600 flex items-center gap-2 mt-2">
                      <User className="w-4 h-4 text-purple-500" />
                      <strong>Providing By:</strong> {items.admin || "Not Available"}
                    </p>

                    <p className="text-gray-600 flex items-center gap-2 mt-2">
                      <RotateCcw className="w-4 h-4 text-purple-500" />
                      <strong>Date To Receive:</strong> {items.delivery_date || "Not Available"}
                    </p>


    
                    {/* Status Badge */}
                    <div className="mt-4 flex items-center gap-2">
                        <Badge variant="outline" className={`text-white py-1 px-3 rounded-lg ${statusColors[items.status] || "bg-gray-500"}`}>
                            {items.status.replace(/_/g, " ").charAt(0).toUpperCase() + items.status.slice(1)}
                        </Badge>
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-lg font-semibold text-gray-800 text-center">
              No confirmed itemss found.
            </p>
          )}
        </div>
      );
};
export default UserCartDelivery
