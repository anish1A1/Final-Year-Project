"use client"
import React, {useState, useEffect, useContext} from 'react'
import { ProductContext } from '../../../utils/prod'
import { FaClock, FaUser, FaBoxOpen} from "react-icons/fa"
import { useRouter } from 'next/navigation';
const AllTrades = () => {
    const {fetchAllTrades, allTrades} = useContext(ProductContext);
    const [timeLeft, setTimeLeft] = useState({});
    const router = useRouter();
    useEffect(() => {
        const formData = async () => {
            await fetchAllTrades();
        }
        formData();
    },[]);


    // Function to calculate remaining time dynamically
    const calculateTimeLeft = (tradeEndingDate) => {
        const now = new Date().getTime();
        const endTime = new Date(tradeEndingDate).getTime();
        const difference = endTime - now

        if (difference < 0){
            return {status: "Trade Ended", time : "0h 0m 0s"};
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return {
            status: "Trade Active",
            time: days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m ${seconds}s`,
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const updateTimeLeft = {};
            allTrades.forEach((trade) => {
                updateTimeLeft[trade.id] = calculateTimeLeft(trade.trade_ending_date);
            });
            setTimeLeft(updateTimeLeft);
        }, 1000);  // This will update countdown every second
        return () => clearInterval(interval); // Clear the interval when the component unmounts
    }, [allTrades])




    // To check the  values
    // if (allTrades.length > 0) {
    //     console.log(`allTrades: ${allTrades}`);
    // }

    const handleView = (id) => {
        router.push(`/viewProduct/${id}`);
    }



  return (
    <div className="container mx-auto mt-24 px-6">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">All Trades</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTrades.length > 0 ? (
            allTrades.map((trade) => (
                <div key={trade.id} className="bg-white shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105">
                    {trade.product.product_image && (
                        <img
                            src={trade.product.product_image}
                            alt={trade.product.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                    )}

                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{trade.product.name}</h2>
                    <p className="text-gray-600">{trade.product.small_description}</p>

                    <div className="mt-3">
                        <p className="text-gray-900 font-semibold">Selling Price: <span className="text-blue-600">${trade.product.selling_price}</span></p>
                        <p className="text-gray-700">Wanted Product: <span className="font-semibold">{trade.wanted_product}</span></p>
                        <p className="text-gray-700">Wanted Quantity (per Unit): <span className="font-semibold">{trade.wanted_quantity}</span></p>
                        <p className="text-gray-700">Wanted Price: <span className="font-semibold">${trade.wanted_price}</span></p>
                        <p className="text-gray-700">Note: <span className="font-semibold">{trade.note}</span></p>
                        <p className="text-gray-700">Total Trade Amount: <span className="font-semibold">{trade.total_amount}</span></p>

                    </div>

                    <div className="mt-4 border-t pt-3">
                        <div className="flex justify-between items-center text-gray-700 text-sm">
                            <span className="flex items-center"><FaUser className="mr-2 text-blue-500" /> {trade.user}</span>
                            <span className="flex items-center"><FaBoxOpen className="mr-2 text-green-500" /> {trade.product.category.name}</span>
                        </div>
                    </div>

                    {/* Countdown Timer */}
                    <div className="mt-4">
                        <div className={`flex items-center text-lg font-semibold ${timeLeft[trade.id]?.status === "Trade Ended" ? "text-red-600" : "text-green-600"}`}>
                            <FaClock className="mr-2" />
                            {timeLeft[trade.id]?.time || "Calculating..."}
                        </div>
                        <p className={`text-sm font-medium ${timeLeft[trade.id]?.status === "Trade Ended" ? "text-red-600" : "text-gray-600"}`}>
                            {timeLeft[trade.id]?.status}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-5">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleView(trade.product.id)}
                        >
                            View Product
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Trade Now
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-gray-700 text-center col-span-3">No trades available.</p>
        )}
    </div>
</div>
);
};


export default AllTrades;