"use client";
import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../../../../utils/prod";
import { FaClock, FaUser, FaBoxOpen, FaProductHunt} from "react-icons/fa"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";
import { PackageSearch, HandCoins, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const TradeProductList = () => {
    const { fetchTrades, trades, loading } = useContext(ProductContext);
        const router = useRouter();
    

    useEffect(() => {
        const fetchData = async () => {
            await fetchTrades();
        };
        fetchData();
    }, []);

    const handleTradeView= (id) => {
        router.push(`/allTrades/${id}`);

    }

    const deleteTrade = (id) => {

    }

    const updateTrade = (id) => {
        
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-600">
                Loading trades...
            </div>
        );
    }

    return (
        <div className="container mx-auto  px-1">
    {/* <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">All Trades</h1>1 */}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
      {trades && trades.length > 0 ? (
        trades.map((trade) => (
          <div
            key={trade.id}
            className="bg-white shadow-xl rounded-xl p-6 transition-all transform  hover:shadow-2xl border border-gray-200"
          >
            {trade.product.product_image && (
              <img
                src={trade.product.product_image}
                alt={trade.product.name}
                className="cursor-pointer w-full h-52 object-cover rounded-lg mb-4 "
                onClick={() => handleTradeView(trade.id)}

              />
            )}

                 <Badge className="absolute top-4 left-4 hover:text-blue-200 bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-md shadow-md">
                 {trade.product.category.name}
                                  
                                </Badge>


            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{trade.product.name}</h2>

            <div className="mt-3 space-y-2">
              {/* <div className="flex justify-between items-center text-lg font-medium">
                <p className="text-gray-700">S. Price: <span className="text-blue-600">Rs.{trade.product.selling_price}</span></p>
                <p className="text-gray-700">Wanted: <span className="text-red-600">Rs.{trade.wanted_price}</span></p>
              </div> */}

              <p className="text-gray-700 flex items-center gap-2">
              <PackageSearch size={20}/>
                Wanted Product: <span className="font-semibold">{trade.wanted_product}</span></p>
              <p className="text-gray-700 flex items-center gap-2">
              <HandCoins size={20}/>
                Wanted Quantity: <span className="font-semibold">{trade.wanted_quantity} unit</span></p>
              {/* <p className="text-gray-700">Note: <span className="italic">{trade.note}</span></p> */}
              {/* <p className="text-gray-700">Total Trade Amount: <span className="font-bold text-green-700">Rs.{trade.total_amount}</span></p> */}
            </div>

            <div className="mt-4 border-t pt-3 flex space-x-1 items-center text-gray-700 text-sm">
            <Clock className="w-4 h-4 text-yellow-600" />{" "}
              <p className="flex items-center font-semibold  text-gray-700">End Date:
                <span className="pl-2"> 
                    {trade.created_at < trade.trade_ending_date ? (
                        <span className="text-red-600">This Trade has Expired</span>) : (
                            <>
                    {new Date(trade.trade_ending_date).toLocaleString()}
                            </>
                    )}
                </span>
                </p>
            </div>

                    <div className="flex justify-between mt-5">
              <button
                className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300"
                onClick={() => handleTradeView(trade.id)}
              >
                View Trade
              </button>

             
                <button
                  className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300"
                  onClick={() => handleTradeRequest(trade.id, timeLeft[trade.id].status)}
                >
                  Trade Now
                </button>
              
            </div>

            {/* <div className="mt-4 border-t pt-3 flex justify-between text-gray-700 text-sm">
              <span className="flex items-center"><FaUser className="mr-2 text-blue-500" /> {trade.user_name}</span>
              <span className="flex items-center"><FaBoxOpen className="mr-2 text-green-500" /> {trade.product.category.name}</span>
            </div> */}

            {/* Countdown Timer */}
            {/* <div className="mt-4">
              <div className={`flex items-center text-lg font-semibold ${timeLeft[trade.id]?.status === "Trade Ended" ? "text-red-600" : "text-green-600"}`}>
                <FaClock className="mr-2" />
                {timeLeft[trade.id]?.time || "Calculating..."}
              </div>
              <p className={`text-sm font-medium ${timeLeft[trade.id]?.status === "Trade Ended" ? "text-red-600" : "text-gray-600"}`}>
                {timeLeft[trade.id]?.status}
              </p>
            </div> */}

            {/* Buttons */}
            {/* <div className="flex justify-between mt-5">
              <button
                className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300"
                onClick={() => handleTradeView(trade.id)}
              >
                View Trade
              </button>

              {hasRequestedTrade(trade.id) ? (
                <p className="text-green-600 font-bold text-sm mt-2">Trade Requested</p>
              ) : (
                <button
                  className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300"
                  onClick={() => handleTradeRequest(trade.id, timeLeft[trade.id].status)}
                >
                  Trade Now
                </button>
              )}
            </div> */}
          </div>
        ))
      ) : (
        <p className="text-gray-700 text-center col-span-3">No trades available.</p>
      )}
    </div>
  </div>
    );
};

export default TradeProductList;
