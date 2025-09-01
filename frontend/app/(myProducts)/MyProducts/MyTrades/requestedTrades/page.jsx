"use client";
import React, { useEffect, useContext } from "react";
import { ProductContext } from "../../../../../utils/prod";
import { Send, SquareArrowDown, Inbox } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const RequestedTrades = () => {
  const { fetchTradeRequests, tradeRequests, loading } = useContext(ProductContext);

  useEffect(() => {
    fetchTradeRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-muted-foreground">
        Loading your trades...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
        <Inbox size={28} className="text-primary" />
        Your Requested Trades
      </h1>

      {tradeRequests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tradeRequests.map((request) => (
            <Card
              key={request.id + request.product_name + request.trade.id}
              className="rounded-2xl transition-all hover:shadow-lg hover:scale-[1.02] duration-200"
            >
              {/* Product Image */}
              {request.trade.product.product_image && (
                <img
                  src={request.trade.product.product_image}
                  alt={request.trade.product.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              )}

              <CardContent className="p-5 space-y-4">
                {/* Sending Product */}
                <div>
                  <h2 className="text-base font-semibold text-muted-foreground flex items-center gap-2">
                    <Send size={18} className="text-green-600" />
                    Sending Product
                  </h2>
                  <p className="text-gray-900 font-medium">{request.product_name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {request.trade.wanted_quantity} unit
                  </p>
                </div>

                {/* Receiving Product */}
                <div>
                  <h2 className="text-base font-semibold text-muted-foreground flex items-center gap-2">
                    <SquareArrowDown size={18} className="text-blue-600" />
                    Receiving Product
                  </h2>
                  <p className="text-gray-900 font-medium">
                    {request.trade.product.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {request.trade.trading_quantity} unit
                  </p>
                </div>

                {/* Delivery Location */}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Delivery Location:</span> {request.delivery_location}
                </div>

                {/* Status */}
                <div
                  className={`text-center text-sm font-semibold rounded-md py-2 px-4 ${
                    request.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : request.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Status: {request.status}
                </div>

                {/* View Trade Button */}
                {request.status === "accepted" && (
                  <Link href="/MyProducts/MyTrades/ReceiveTradeDelivery">
                    <Button className="w-full mt-2">View Delivery</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 text-muted-foreground text-lg">
          You have not requested any trades yet.
        </div>
      )}
    </div>
  );
};

export default RequestedTrades;
