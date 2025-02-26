"use client";

import React, { useEffect, useState, useContext } from "react";
import { ProductContext  } from "../../../utils/prod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Package, MapPin, RotateCcw, CheckCircle } from "lucide-react";

const GetConfirmedTradesByUser = () => {
  const {
    fetchAllConfirmedTradesOfUser,
    confirmedTrades,
    updateConfirmedTradeByUser,
    loading,
  } = useContext(ProductContext);

  const [updatingTradeId, setUpdatingTradeId] = useState(null);
  
  useEffect(() => {
    fetchAllConfirmedTradesOfUser();
  }, []);

  const handleItemReceivedChange = async (id, newValue) => {
    setUpdatingTradeId(id);
    try {
      await updateConfirmedTradeByUser(id, { item_received: newValue });
        // fetchAllConfirmedTradesOfUser();
      
    } catch (error) {
      console.error("Failed to update trade:", error);
    } finally {
      setUpdatingTradeId(null);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        📦 Your Confirmed Trades
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen text-xl font-semibold">
          Loading...
        </div>
      ) : confirmedTrades.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {confirmedTrades.map((trade) => (
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

                {/* Item Location */}
                <p className="text-gray-600 flex items-center gap-2 mt-2">
                  <strong>Item Location:</strong> {trade.item_location || "Not available"}
                </p>

                {/* Item Received */}
                {trade.status === "delivered" && (
                  <div className="mt-4 bg-gray-100 p-3 rounded-lg">
                    <p className="text-gray-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-yellow-500" />
                      <strong>Item Received:</strong>
                    </p>
                    <div className="flex items-center gap-2 mt-2 pr-4">
                        {trade.item_received === false ?(
                            <Switch
                              checked={trade.item_received}
                              onCheckedChange={(newValue) => handleItemReceivedChange(trade.id, newValue)}
                              disabled={updatingTradeId === trade.id}
                            />

                        ) : null}
                      <span>
                        {trade.item_received ? "Yes ✅" : "No ❌"}
                      </span>
                    </div>
                    {updatingTradeId === trade.id && (
                      <p className="text-blue-500 text-sm mt-2">Updating...</p>
                    )}
                  </div>
                )}

                {/* Last Updated */}
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
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-lg font-semibold text-gray-800 text-center">
          No confirmed trades found.
        </p>
      )}
    </div>
  );
};

export default GetConfirmedTradesByUser;
