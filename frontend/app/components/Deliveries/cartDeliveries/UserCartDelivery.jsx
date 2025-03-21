"use client"
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../../../utils/cart';
import { AuthContext } from '../../../../utils/auth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, PackageCheck, Clock, MapPin, DollarSign, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const statusColors = {
  pending: "border-yellow-600 text-yellow-600",
  owner_to_admin: "border-gray-600 text-gray-600",
  admin_received: "border-blue-600 text-blue-600",
  delivering_to_user: "border-blue-600 text-blue-600",
  delivered: "border-green-600 text-green-600",
  canceled: "border-red-600 text-red-600",
};

const UserCartDelivery = () => {
  const { fetchCartDeliveries, cartDeliveries, updateCartDeliveryForBuyer, loading } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [updatingDeliveryId, setUpdatingDeliveryId] = useState(null);

  useEffect(() => {
    fetchCartDeliveries();
  }, [user]);

  const handleItemReceivedChange = async (id, newStatus) => {
    setUpdatingDeliveryId(id);
    try {
      // console.log('Item received change, newStatus);', newStatus);
      const response = await updateCartDeliveryForBuyer(id, {item_received_by_user: newStatus});
        toast.success( response.message || 'Delivery status updated successfully');
          
    } catch (error) {
      toast.error(error.message || 'Failed to Update the Delivery Status');

    } finally{
      setUpdatingDeliveryId(null);
    }
  }


  return (
    <div className="container mx-auto px-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        📦 Your Ordered Product Deliveries
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">


      {loading ? (
        <div className="flex justify-center items-center text-xl font-semibold">
          Loading...
        </div>
      ) : cartDeliveries.length > 0 ? (
        cartDeliveries.map((item) => (
          <Card key={item.id}
          className="bg-white shadow-lg rounded-xl p-6 transition-all transform  hover:shadow-2xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Truck className="text-green-600" /> Delivery of Cart ID: {item.cart_payment.id}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status:</span>
                  <Badge variant="outline" className={statusColors[item.status] || "border-gray-600 text-gray-600"}>
                    {item.status.replace(/_/g, " ").charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Delivery Location:</span>
                  <span className="font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" /> {item.cart_payment.delivery_address || "Not available"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Item Location:</span>
                  <span className="font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" /> {item.delivery_location || "Not available"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Total Payment:</span>
                  <span className="font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-purple-600" /> {item.cart_payment.amount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Providing By:</span>
                  <span className="font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-600" /> {item.admin_username ? item.admin_username.charAt(0).toUpperCase() + item.admin_username.slice(1) : "Not Available"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Date To Receive:</span>
                  <span className="font-medium">{item.delivery_date || "Not Available"}</span>
                </div>
                        {/* <div className="flex justify-between items-center ">
                        <span className="text-gray-500">User Info:</span>
                      <div className="flex justify-between items-center gap-3">
                        <span className="font-medium">{item.cart_payment.user.charAt(0).toUpperCase() + item.cart_payment.user.slice(1)}</span>   ||
                        <span className="font-medium">Email: {item.cart_payment.email || "Not Available"}</span> </div>
                      </div>
                       */}
                <Separator />
                {item.status === "delivered" && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Item Received:</span>
                    <div className="flex items-center gap-2">
                      {item.item_received_by_user === false ? (
                        <Switch
                          checked={item.item_received_by_user}
                          onCheckedChange={(newValue) => handleItemReceivedChange(item.id, newValue)}
                          disabled={updatingDeliveryId === item.id}
                        />
                      ): null}
                      <span>{item.item_received_by_user ? "Yes ✅" : "No ❌"}</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-2 mt-4">
                  {/* <Button variant="outline">Track Package</Button> */}
                  <Button className="bg-green-600 hover:bg-green-700 text-white cursor-not-allowed">
                    <PackageCheck className="w-4 h-4 mr-2 " /> Confirmed Delivery
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-lg font-semibold text-gray-800 text-center">
          No confirmed items found.
        </p>
      )}
    


      </div>
    </div>
  );
};

export default UserCartDelivery;