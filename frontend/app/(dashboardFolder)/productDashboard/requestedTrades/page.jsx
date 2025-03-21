"use client";
import React, { useEffect, useContext } from "react";
import { ProductContext } from "../../../../utils/prod";
import { Send, SquareArrowDown  } from 'lucide-react';
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";

const RequestedTrades = () => {
  const { fetchTradeRequests, tradeRequests, loading } = useContext(ProductContext);

  useEffect(() => {
    fetchTradeRequests();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-24 pt-2 px-4 sm:px-6 lg:px-8">
      <BreadCrumbs />
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
    Your Requested Trades
  </h1>

  {tradeRequests.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {tradeRequests.map((request) => (
        <div
          key={request.id + request.product_name + request.trade.id}
          className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-all transform hover:-translate-y-1 hover:scale-105"
        >
          {/* Product Image */}
          {request.trade.product.product_image && (
            <img
              src={request.trade.product.product_image}
              alt={request.trade.product.name}
              className="w-full h-56 object-cover"
            />
          )}

          <div className="p-2 pl-5">
            {/* Sending Product Section */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-700 flex items-center mb-2">
              <Send className="mr-2 text-green-500" />

                Sending Product
              </h2>
              <p className="text-gray-800 font-medium">
                {request.product_name}
              </p>
              <p className="text-sm text-gray-600">
                Receiving Quantity: {request.trade.trading_quantity}
              </p>
            </div>

            <hr className="border-gray-200 my-4" />

            {/* Receiving Product Section */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-700 flex items-center mb-2">
              <SquareArrowDown className="mr-2 text-blue-500" />

                Receiving Product
              </h2>
              <p className="text-gray-800 font-medium">
                {request.trade.product.name}
              </p>
              <p className="text-sm text-gray-600">
                Sending Quantity: {request.trade.wanted_quantity}
              </p>
            </div>

            <hr className="border-gray-200 my-4" />

            {/* Delivery Details */}
            <p className="text-sm text-gray-600 mb-4">
              <strong>Delivery Location:</strong> {request.delivery_location}
            </p>

            {/* Status */}
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
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-700 text-center text-lg">
      You have not requested any trades yet.
    </p>
  )}
</div>

  );
};

export default RequestedTrades;
