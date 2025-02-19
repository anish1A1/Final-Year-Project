"use client";
import React, { useEffect, useContext } from "react";
import { ProductContext } from "../../../../utils/prod";

const TradeOwnerRequests = () => {
  const { fetchOwnerTradeRequests, ownerTradeRequests, updateTradeRequestStatus, loading } = useContext(ProductContext);

  useEffect(() => {
    fetchOwnerTradeRequests();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    await updateTradeRequestStatus(id, newStatus);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-20 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Trade Requests for Your Products</h1>

      {ownerTradeRequests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownerTradeRequests.map((request) => (
            <div key={request.id} className="bg-white p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              {request.image && (
                <img src={request.image} alt={request.product_name} className="w-full h-48 object-cover rounded-lg mb-4" />
              )}
              <h2 className="text-xl font-semibold text-gray-900">{request.product_name}</h2>
              <p className="text-gray-600">Requested By: {request.user.username}</p>
              <p className="text-gray-600">Quantity: {request.quantity}</p>
              <p className="text-gray-600">Price: ${request.price}</p>
              <p className="text-gray-600">Total Cost: ${request.total_cost}</p>
              <p className="text-gray-600">Delivery Location: {request.delivery_location}</p>
              <p className="text-gray-600 font-medium">Note: {request.note}</p>

              <div className="mt-4">
                <p className={`font-semibold ${request.status === "accepted" ? "text-green-600" : request.status === "rejected" ? "text-red-600" : "text-gray-600"}`}>
                  Status: {request.status}
                </p>
              </div>

              {request.status === "pending" && (
                <div className="mt-4 flex justify-between">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleStatusUpdate(request.id, "accepted")}>
                    Accept
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleStatusUpdate(request.id, "rejected")}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center">No trade requests received yet.</p>
      )}
    </div>
  );
};

export default TradeOwnerRequests;
