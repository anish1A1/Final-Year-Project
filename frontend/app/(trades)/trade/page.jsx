"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { ProductContext } from "../../../utils/prod";


const ViewTradesPage = () => {
    const { fetchTrades, trades, loading, error } = useContext(ProductContext);
    const router = useRouter();

    useEffect(() => {
        fetchTrades();
    }, []);

    return (
        <div className="container mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Trades</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {/* {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>} */}
            {loading ? (
                <p className="text-center">Loading trades...</p>
            ) : (
                <div>
                    {trades.length > 0 ? (
                        trades.map((trade) => (
                            <div key={trade.id} className="p-4 border-b mb-4">
                                <h2 className="text-lg font-semibold mb-2">{trade.product.name}</h2>
                                <p className="text-gray-700">Created at: {new Date(trade.created_at).toLocaleString()}</p>
                                <button
                                    onClick={() => router.push(`/trades/${trade.id}/requests`)}
                                    className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                                >
                                    View Trade Requests
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-lg">You have not created any trades.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewTradesPage;
