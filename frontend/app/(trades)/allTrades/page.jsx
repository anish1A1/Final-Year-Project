"use client"
import React, {useState, useEffect, useContext} from 'react'
import { ProductContext } from '../../../utils/prod'
import { FaClock, FaUser, FaBoxOpen, FaProductHunt} from "react-icons/fa"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
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

    const handleTradeRequest = (id, timeStatus) => {
        if (timeStatus === 'Trade Ended') {
            toast.error('This Trade has ended');
            return;
        }
        router.push(`/CreateTradeRequest/${id}`);
    }

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



    const handleTradeView= (id) => {
        router.push(`/allTrades/${id}`);

    }


    const hasRequestedTrade = (tradeId) => {
        return allTrades.some(req => req.trade === tradeId);
    }


  return (
    <div className="container mx-auto mt-24 px-6">
    <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">All Trades</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {allTrades.length > 0 ? (
        allTrades.map((trade) => (
          <div
            key={trade.id}
            className="bg-white shadow-xl rounded-xl p-6 transition-all transform hover:scale-105 hover:shadow-2xl border border-gray-200"
          >
            {trade.product.product_image && (
              <img
                src={trade.product.product_image}
                alt={trade.product.name}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
            )}

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{trade.product.name}</h2>

            <div className="mt-3 space-y-2">
              <div className="flex justify-between items-center text-lg font-medium">
                <p className="text-gray-700">S. Price: <span className="text-blue-600">Rs.{trade.product.selling_price}</span></p>
                <p className="text-gray-700">Wanted: <span className="text-red-600">Rs.{trade.wanted_price}</span></p>
              </div>
              <p className="text-gray-700">Wanted Product: <span className="font-semibold">{trade.wanted_product}</span></p>
              {/* <p className="text-gray-700">Quantity (per Unit): <span className="font-semibold">{trade.wanted_quantity}</span></p>
              <p className="text-gray-700">Note: <span className="italic">{trade.note}</span></p> */}
              <p className="text-gray-700">Total Trade Amount: <span className="font-bold text-green-700">Rs.{trade.total_amount}</span></p>
            </div>

            <div className="mt-4 border-t pt-3 flex justify-between text-gray-700 text-sm">
              <span className="flex items-center"><FaUser className="mr-2 text-blue-500" /> {trade.user_name}</span>
              <span className="flex items-center"><FaBoxOpen className="mr-2 text-green-500" /> {trade.product.category.name}</span>
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