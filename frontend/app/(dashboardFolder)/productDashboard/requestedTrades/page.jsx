"use client";
import React, { useEffect, useContext } from "react";
import { ProductContext } from "../../../../utils/prod";

const RequestedTrades = () => {
  const { fetchTradeRequests, tradeRequests, loading } = useContext(ProductContext);

  useEffect(() => {
    fetchTradeRequests();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-28 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Trade Requests</h1>

      {tradeRequests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tradeRequests.map((request) => (
            <div key={request.id + request.product_name + request.trade.id} className="bg-white p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              {request.trade.product.product_image && (
                <img src={request.trade.product.product_image} alt={request.trade.product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              )}
              <h2 className="text-xl font-semibold text-gray-900">{request.trade.product.name}</h2>
              <p className="text-gray-600">Real Price(per Unit): ${request.trade.wanted_price}</p>
              <p className="text-gray-600">Product Quantity Requested : {request.trade.wanted_quantity}</p>
              <p className="text-gray-600 mb-2">Delivery Location: {request.delivery_location}</p>
              <p className="text-gray-600 font-semibold">Product To Give: {request.product_name}</p>
              <p className="text-gray-600">Available Quantity: {request.quantity}</p>
              <p className="text-gray-600">Your Price: ${request.price}</p>
              <p className="text-gray-600">Total Cost: ${request.total_cost}</p>


              <p className={`font-semibold mt-2 ${request.status === "accepted" ? "text-green-600" : request.status === "rejected" ? "text-red-600" : "text-gray-600"}`}>
                Status: {request.status}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center">You have not requested any trades yet.</p>
      )}
    </div>
  );
};

export default RequestedTrades;
