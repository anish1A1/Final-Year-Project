"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProductContext } from '../../../../utils/prod';
import { FaClock, FaUser, FaBoxOpen } from "react-icons/fa";
import { toast } from 'sonner';

const TradeViewPage = () => {
    const { getTradeById, tradeById, loading } = useContext(ProductContext);
    const router = useRouter();
    const { id } = useParams();
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        getTradeById(id);
    }, [id]);

    useEffect(() => {
        if (!tradeById) return;

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const endTime = new Date(tradeById.trade_ending_date).getTime();
            const difference = endTime - now;

            if (difference < 0) {
                return { status: "Trade Ended", time: "0h 0m 0s" };
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            return {
                status: "Trade Active",
                time: days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m ${seconds}s`,
            };
        };

        setTimeLeft(calculateTimeLeft());
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(interval);
    }, [tradeById]);

    const handleProductView = (id) => {
        router.push(`/viewProduct/${id}`);
    };

    const handleTradeRequest = (tradeId, status) => {
        if (status === "Trade Ended") {
            toast.error("Trade has already ended. Cannot request.");
            return;
        }
        router.push(`/CreateTradeRequest/${tradeId}`);
        // toast.success("Trade request sent successfully!");
        // Add actual logic to send trade request here
    };

    const hasRequestedTrade = (tradeId) => {
        return tradeById.requests && tradeById.requests.some(req => req.trade === tradeId);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-gray-600 text-lg animate-pulse">Loading trade details...</p>
            </div>
        );
    }

    if (!tradeById) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-gray-600 text-lg animate-pulse">No Trade Found...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-24 px-6">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Trade Details</h1>
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto transform transition duration-300 hover:shadow-2xl hover:scale-105">
                {tradeById.product.product_image && (
                    <img
                        src={tradeById.product.product_image}
                        alt={tradeById.product.name}
                        className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                )}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{tradeById.product.name}</h2>
                
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <p><span className="font-semibold">S. Price:</span> <span className="text-blue-600 font-bold">Rs.{tradeById.product.selling_price}</span></p>
                    <p><span className="font-semibold">Wanted:</span> <span className="text-red-600 font-bold">Rs.{tradeById.wanted_price}</span></p>
                    <p><span className="font-semibold">Wanted Product:</span> <span className="font-semibold">{tradeById.wanted_product}</span></p>
                    <p><span className="font-semibold">Quantity:</span> <span className="font-semibold">{tradeById.wanted_quantity}</span></p>
                    <p><span className="font-semibold">Total Amount:</span> <span className="font-bold text-green-700">Rs.{tradeById.total_amount}</span></p>
                </div>

                <p className="mt-4 text-gray-600 italic">{tradeById.note}</p>

                <div className="mt-5 flex justify-between text-gray-700 text-sm">
                    <span className="flex items-center"><FaUser className="mr-2 text-blue-500" /> {tradeById.user_name}</span>
                    <span className="flex items-center"><FaBoxOpen className="mr-2 text-green-500" /> {tradeById.product.category.name}</span>
                </div>

                {/* Countdown Timer */}
                <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-gray-100">
                    <div className="flex items-center text-lg font-semibold">
                        <FaClock className="mr-2 text-gray-700" />
                        <span className={timeLeft?.status === "Trade Ended" ? "text-red-600" : "text-green-600"}>
                            {timeLeft?.time || "Calculating..."}
                        </span>
                    </div>
                    <p className={`text-sm font-medium ${timeLeft?.status === "Trade Ended" ? "text-red-600" : "text-gray-600"}`}>
                        {timeLeft?.status}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                        onClick={() => handleProductView(tradeById.product.id)}
                    >
                        View Product
                    </button>

                    {hasRequestedTrade(tradeById.id) ? (
                        <p className="text-green-600 font-bold text-sm mt-2">Trade Requested</p>
                    ) : (
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                            onClick={() => handleTradeRequest(tradeById.id, timeLeft?.status)}
                        >
                            Trade Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TradeViewPage;
