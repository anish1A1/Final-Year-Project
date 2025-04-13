'use client';
import React, { useEffect, useState } from 'react';
import { FaClock, FaUser, FaBoxOpen } from 'react-icons/fa';
import { PackageSearch, HandCoins } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const TradeCard = ({ trade }) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({ status: '', time: '' });

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const endTime = new Date(trade.trade_ending_date).getTime();
    const difference = endTime - now;

    if (difference < 0) {
      return { status: 'Trade Ended', time: '0h 0m 0s' };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      status: 'Trade Active',
      time: days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m ${seconds}s`,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTradeView = (id) => {
    router.push(`/allTrades/${id}`);
  };

  const handleTradeRequest = (id) => {
    if (timeLeft.status === 'Trade Ended') {
      toast.error('This Trade has ended');
      return;
    }
    router.push(`/CreateTradeRequest/${id}`);
  };

  return (
    <div
      key={trade.id}
      className="bg-white shadow-xl rounded-xl p-6 transition-all transform hover:shadow-2xl border border-gray-200"
    >
      {trade.product.product_image && (
        <img
          src={trade.product.product_image}
          alt={trade.product.name}
          className="cursor-pointer w-full h-52 object-cover rounded-lg mb-4"
          onClick={() => handleTradeView(trade.id)}
        />
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{trade.product.name}</h2>

      <div className="mt-3 space-y-2">
        <p className="text-gray-700 flex items-center gap-2">
          <PackageSearch size={20} />
          Wanted Product: <span className="font-semibold">{trade.wanted_product}</span>
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <HandCoins size={20} />
          Wanted Quantity: <span className="font-semibold">{trade.wanted_quantity} unit</span>
        </p>
      </div>

      <div className="mt-4 border-t pt-3 flex justify-between text-gray-700 text-sm">
        <span className="flex items-center">
          <FaUser className="mr-2 text-blue-500" /> {trade.user_name}
        </span>
        <span className="flex items-center">
          <FaBoxOpen className="mr-2 text-green-500" /> {trade.product.category.name}
        </span>
      </div>

      {/* Countdown Timer */}
      <div className="mt-4">
        <div
          className={`flex items-center text-lg font-semibold ${
            timeLeft.status === 'Trade Ended' ? 'text-red-600' : 'text-green-600'
          }`}
        >
          <FaClock className="mr-2" />
          {timeLeft.time || 'Calculating...'}
        </div>
        <p
          className={`text-sm font-medium ${
            timeLeft.status === 'Trade Ended' ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          {timeLeft.status}
        </p>
      </div>
    </div>
  );
};

export default TradeCard;
