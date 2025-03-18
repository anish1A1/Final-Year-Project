"use client";

import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../../utils/prod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw, Package, MapPin, CheckCircle, Truck, User } from "lucide-react";
import { toast } from "sonner";
import { AuthContext } from "../../../utils/auth";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";

const GetConfirmedTradesByOwner = () => {
  const {
    fetchConfirmedTradesByOwner,
    loading,
    confirmedTradesOfOwner,
    updateConfirmedTrade,
  } = useContext(ProductContext);

  
  const {user} = useContext(AuthContext);
  const [updatingTradeId, setUpdatingTradeId] = useState(null);
  const [locationInputs, setLocationInputs] = useState({}); // Store input values for each trade
  const [savingLocationId, setSavingLocationId] = useState(null); // Track saving state for location

  useEffect(() => {
    fetchConfirmedTradesByOwner();
  }, [user]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingTradeId(id);
    try {
      const response =await updateConfirmedTrade(id, { status: newStatus });
      toast.success(response.message || "Trade status updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update trade status.");
      console.error("Failed to update trade:", error);
    } finally {
      setUpdatingTradeId(null);
    }
  };

  const handleLocationChange = (id, value) => {
    setLocationInputs((prev) => ({
      ...prev,
      [id]: value,
    })

    );
  };

  const saveLocation = async (id) => {
    if (!locationInputs[id]) return;
    setSavingLocationId(id);
    try {
      const data = await updateConfirmedTrade(id, { item_location: locationInputs[id] });
      toast.success(data.message || "Location updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update location.");
      console.error("Failed to update location:", error);
    } finally {
      setSavingLocationId(null);
    //   setLocationInputs(null); 
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-100 min-h-screen">
      <BreadCrumbs />
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        📦 Your Trades Delivery
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen text-xl font-semibold">
          Loading...
        </div>
      ) : confirmedTradesOfOwner.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {confirmedTradesOfOwner.map((trade) => (
            <Card
              key={trade.id}
              className="bg-white p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Package className="w-6 h-6 text-blue-600" />
                  {trade.trade_request.product_name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                {/* Delivery Location */}
                <p className="text-gray-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <strong>Delivery Location:</strong> {trade.trade_request.delivery_location}
                </p>

                <p className="text-gray-600 flex items-center gap-2">
                    <User className="w-4 h-4 text-green-600" />
                    <strong>Customer Name:</strong> {trade.trade_request.user.charAt(0).toUpperCase() + trade.trade_request.user.slice(1)}
                </p>

                {/* Trade Item Location (Editable) */}
                <div className="mt-2">
                  <p className="text-gray-600 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <strong>Trade Item Location:</strong> {trade.item_location || "Not available"}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {trade.item_received === false ? (
                        <>
                            <Input
                            type="text"
                            placeholder="Enter new location"
                            value={locationInputs[trade.id] || ""}
                            onChange={(e) => handleLocationChange(trade.id, e.target.value)}
                            className="w-full"
                          />
                          <Button
                            onClick={() => saveLocation(trade.id)}
                            disabled={savingLocationId === trade.id}
                            className="bg-blue-500 text-white"
                          >
                            {savingLocationId === trade.id ? "Saving..." : "Save"}
                          </Button>
                          </>
                    ) : (
                        null
                    ) }
                    
                  </div>

                </div>

                {/* Item Received Status */}
                <p className="text-gray-600 flex items-center gap-2 mt-2">
                  <CheckCircle className="w-4 h-4 text-yellow-500" />
                  <strong>Item Received:</strong> {trade.item_received ? "Yes ✅" : "No ❌"}
                </p>

                {/* Last Updated Time */}
                <p className="text-gray-600 flex items-center gap-2 mt-2">
                  <RotateCcw className="w-4 h-4 text-purple-500" />
                  <strong>Last Updated:</strong> {new Date(trade.updated_at).toLocaleString()}
                </p>

                {/* Status Badge */}
                <div className="mt-4 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-white py-1 px-3 rounded-lg ${
                      trade.status === "processing"
                        ? "bg-yellow-500"
                        : trade.status === "delivering"
                        ? "bg-blue-500"
                        : trade.status === "delivered"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
                  </Badge>
                </div>

                {/* Status Update Dropdown */}
                <div className="mt-4">
                  {trade.item_received === false ? (
                    <>
                    <Select
                    defaultValue={trade.status}
                    onValueChange={(newStatus) => handleStatusChange(trade.id, newStatus)}
                  >
                    <SelectTrigger className="w-full border-gray-300 shadow-sm">
                      <SelectValue placeholder="Change Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="delivering">Delivering</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                    </>
                  ) : null}
                </div>

                {/* Updating Message */}
                {updatingTradeId === trade.id && <p className="text-blue-500 mt-2">Updating...</p>}

                {/* Extra Actions */}
                <div className="mt-4 flex justify-between items-center">
                  <Button variant="outline" className="text-blue-600">
                    View Details
                  </Button>
                  {trade.item_received === false ? (
                  <Button
                    variant="destructive"
                    className="text-white"
                    onClick={() => handleStatusChange(trade.id, "canceled")}
                  >
                    Cancel Trade
                  </Button>

                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-lg font-semibold text-gray-800 text-center">No confirmed trades found.</p>
      )}
    </div>
  );
};

export default GetConfirmedTradesByOwner;
