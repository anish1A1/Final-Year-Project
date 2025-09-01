"use client";
import React, { useEffect, useContext } from "react";
import { ProductContext } from "../../../../../utils/prod";
import { Send, SquareArrowDown  } from 'lucide-react';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TradeOwnerRequests = () => {
  const { getTradeRequestsFromUsers, updateTradeRequestStatus, tradeRequestsOfOwner ,loading } = useContext(ProductContext);
  const router = useRouter();
  useEffect(() => {
    const formData = async () => {
      await getTradeRequestsFromUsers();

    };
    formData();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await updateTradeRequestStatus(id, newStatus);
      toast.success(response?.message || "Trade request status updated successfully!");
      if (newStatus === 'accepted') {
        router.push('/MyProducts/MyTrades/ToDeliverTrade')
      }
      
    } catch (error) {
      toast.error(error.message || "Error updating trade request status.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center mt-44 text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
  <h1 className="text-3xl  font-bold text-center text-gray-800 mb-10">
    Trade Requests for Your Products
  </h1>

  {tradeRequestsOfOwner.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {tradeRequestsOfOwner.map((request) => (
        <div
          key={request.id + request.product_name + request.trade.product.id}
          className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105"
        >
          {/* Product Image */}
          {request.image && (
            <img
              src={request.image}
              alt={request.product_name}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-3 px-6">
            {/* Requested Product Details */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-700 mb-2 flex items-center ">
              <SquareArrowDown size={20} className="mr-2"/>
                Requested Product
              </h2>
              <p className="text-gray-900 font-medium">
                {request.product_name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Requested By:</strong> {request.user}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Your Receiving Quantity:</strong>{" "}
                {request.trade.wanted_quantity}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> {request.note}
              </p>
            </div>

            <hr className="border-gray-300 my-4" />

            {/* Product to Give */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-700 mb-2 flex items-center">
              <Send size={20} className="mr-2"/>

                Your Providing Product
              </h2>
              <p className="text-gray-900 font-medium">
                {request.trade.product.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Your Sending Quantity:</strong>{" "}
                {request.trade.trading_quantity}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Requested Product:</strong>{" "}
                {request.trade.wanted_product}
              </p>
            </div>

            <hr className="border-gray-300 my-4" />

            {/* Delivery & Status */}
            <div className="mb-4">
              <p className="text-sm mb-2 text-gray-600">
                <strong>Delivery Location:</strong> {request.delivery_location}
              </p>
              <p
                className={`font-semibold text-center py-2 px-4 rounded-md ${
                  request.status === "accepted"
                    ? "bg-green-100 text-green-600"
                    : request.status === "rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Status: {request.status}
              </p>
            </div>

            {/* Action Buttons */}
            {request.status === "pending" && (
              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all"
                  onClick={() => handleStatusUpdate(request.id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-all"
                  onClick={() => handleStatusUpdate(request.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-700 text-center text-lg">
      No trade requests received yet.
    </p>
  )}
</div>

  );
};

export default TradeOwnerRequests;
