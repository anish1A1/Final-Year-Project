"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProductContext } from '../../../../utils/prod';
import { FaClock, FaUser, FaBoxOpen } from "react-icons/fa";
import { toast } from 'sonner';
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";
import { Badge } from "@/components/ui/badge";
import axios from '../../../../utils/axios';
import TradeSummary from '../../../../ImpComponent/aiComponent/TradeSummary';


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

    

  const handleUserSelectForTrade = async ( trade_id) => {
    try {
      console.log("Trade ID:", trade_id);

        const response = await axios.post(`/api/chat/create-trade-chat/${trade_id}/`,{}, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }});
        console.log(response.data);
        const data = response.data;
        
        if (data) {

          if (data.message === "Chat already exists.") {
            toast.info("Chat already exists!");
          } else {
            toast.success("Chat created successfully!");
          }
      
          

      router.push('/Chats')

        }


    } catch (error) {
        console.error("Error creating chat:", error);
        toast.error("Error creating chat:", error);

     }
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
        <div className="container mx-auto mt-28 px-6">
        <BreadCrumbs />
        {/* <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Trade Details</h1>
        <p className="text-lg text-gray-600">View and manage all details about your ongoing trade.</p>
    </div> */}
      
        {tradeById && tradeById.product ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white shadow-lg rounded-2xl p-8 transition duration-300 hover:shadow-2xl">
            {/* Product Image & Gallery */}
            <div className="relative lg:col-span-2" >
  {/* Product Image */}
            <img
                src={tradeById.product.product_image}
                alt={tradeById.product.name}
                loading="lazy"
                className="w-full h-96 object-cover rounded-xl mb-4"
            />

            {/* Badge */}
            <Badge className="absolute top-4 left-4 bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 
            hover:text-gray-200  rounded-md shadow-md">
                {tradeById.product.category?.name}
            </Badge>

              {/* Small Preview Thumbnails */}
              <div className="flex gap-3 mb-6">
            {[1,2,3].map((_, index) => (
              <img
              key={index}
              src={tradeById.product.product_image}
              alt="Thumbnail"
              width={20}
              height={20}
              className="w-16 h-16 object-cover border border-gray-200 rounded-lg hover:ring-2 hover:ring-blue-500 transition-all"
            />
            ))}
                
        </div>
      
              {/* Quick Chat */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold mb-3">Quick Message</h3>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-lg shadow-sm w-max">Hello, You can quick message here.</div>
                </div>
                <div className="mt-4 flex gap-3 items-center justify-center px-5">
                  <button className="bg-blue-600 items-center w-full text-white p-3 rounded-lg hover:bg-blue-700"
                  onClick={() =>handleUserSelectForTrade(tradeById.id)}
                  >Message</button>
                </div>
              </div>
      
              {/* Related Products */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Related Products</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="h-28 bg-gray-200 rounded-lg"></div>
                  <div className="h-28 bg-gray-200 rounded-lg"></div>
                  <div className="h-28 bg-gray-200 rounded-lg"></div>
                  <div className="h-28 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
      
            {/* Product Info / Sidebar */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">{tradeById.product.name}</h2>
              {/* <p className="text-lg">Price: <span className="font-bold">**</span> <span className="text-purple-600 text-xl">Rs {tradeById.product.selling_price}/unit</span></p> */}
      
              {/* Buy Section */}
              <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
               
                <div className='flex justify-between items-center'>
                  <p>Wanted Product: <span className="font-semibold">{tradeById.wanted_product}</span></p>

                  <p>Wanted Quantity: <span className="font-semibold">{tradeById.wanted_quantity} unit</span></p>
                </div>

                <div className='flex justify-between items-center border-t pt-2'>
                  <p>Quantity Providing: <span className="text-blue-500 text-lg"> {tradeById.trading_quantity} unit</span></p>

                  {/* <p>Available Quantity: <span className="font-semibold">{tradeById.product.quantity} unit</span></p>    */}
                </div>

                <div className="flex gap-4">
                <p className="text-lg font-medium ">Description: <span className="text-gray-600 italic"> {tradeById.note}</span></p>
                  
                </div>
              </div>
      
              {/* Subtotal */}
              {/* <div>
                <p className="text-lg font-semibold">Total Trading Cost: <span className="text-purple-600">Rs {tradeById.total_amount}</span></p>
              </div> */}

              <div className="space-y-3 flex items-center justify-center">
                <TradeSummary tradeDescription={`I want ${tradeById.trading_quantity}kg / units of ${tradeById.product.name} in exchange for ${tradeById.wanted_quantity} kg /   units of ${tradeById.wanted_product}.`} />
              </div>


      
              {/* Save & Trade Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg"
                 onClick={() => router.push(`/viewProduct/${tradeById.product.id}`)}

                >See Buying Option</button>
                <div className="text-center font-semibold text-gray-500">OR</div>
                {hasRequestedTrade(tradeById.id) ? (
                  <p className="text-green-600 text-center font-bold">Trade Requested</p>
                ) : (
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                    onClick={() => handleTradeRequest(tradeById.id, timeLeft?.status)}
                  >
                    Send Trade
                  </button>
                )}
              </div>
      
              {/* Countdown */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center text-lg font-semibold">
                  <FaClock className="mr-2 text-gray-700" />
                  <span className={timeLeft?.status === "Trade Ended" ? "text-red-600" : "text-green-600"}>
                    {timeLeft?.time || "Calculating..."}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${timeLeft?.status === "Trade Ended" ? "text-red-600" : "text-gray-600"}`}>{timeLeft?.status}</p>
              </div>
      
              {/* Owner */}
              <div className="flex flex-col text-sm text-gray-600 border-t pt-4">
                <span className="flex items-center"><FaUser className="mr-2 text-blue-500" /> {tradeById.user_name}</span>
                <span className="flex items-center mt-2"><FaBoxOpen className="mr-2 text-green-500" /> {tradeById.product.category.name}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <p className="text-gray-600 text-lg animate-pulse">Loading trade details...</p>
          </div>
        )}
      </div>
      
      );
      
};

export default TradeViewPage;
