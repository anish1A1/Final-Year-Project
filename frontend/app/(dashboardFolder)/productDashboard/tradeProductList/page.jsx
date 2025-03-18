"use client";
import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../../../utils/prod";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";


const TradeProductList = () => {
    const { fetchTrades, trades, loading } = useContext(ProductContext);

    useEffect(() => {
        const fetchData = async () => {
            await fetchTrades();
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-600">
                Loading trades...
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-28 px-6">
            <div className="max-w-6xl mx-3 mb-4">
                    <BreadCrumbs />
                  </div>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                Your Trades Created
            </h1>

            {trades && trades.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trades.map((trade) => (
                        <div
                            key={trade.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={trade.product.product_image || "/placeholder.png"}
                                alt={trade.product.name}
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-5">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {trade.product.name}
                                </h2>
                                <p className="text-gray-600 text-sm mt-2">
                                    {trade.product.description.slice(0, 80)}...
                                </p>

                                <div className="mt-3">
                                    <p className="text-gray-900 font-semibold">
                                        Selling Price: <span className="text-blue-600">${trade.product.selling_price}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        Wanted Product: <span className="font-semibold">{trade.wanted_product}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        Wanted Quantity (per unit): <span className="font-semibold">{trade.wanted_quantity}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        Wanted Price: <span className="font-semibold">${trade.wanted_price}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        Note: <span className="font-semibold">{trade.note}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        Total Trade Amount: <span className="font-semibold">${trade.total_amount}</span>
                                    </p>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500">
                    No trades made up till now.
                </p>
            )}
        </div>
    );
};

export default TradeProductList;
