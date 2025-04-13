"use client";
import { useEffect, useContext } from 'react';
import { ProductContext } from '../../utils/prod';
import TradeCard from '../../app/components/AllComponents/TradeCard';
const HomeTrade = () => {
     const {fetchAllTrades, allTrades, loading} = useContext(ProductContext);
        useEffect(() => {
            const formData = async () => {
                await fetchAllTrades();
            }
            formData();
        },[]);
    
    
        if(loading){
            return <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-700">Loading...</div>
          };
    
  return (
    <div className="container mx-auto  px-6">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 mb-2">
      {allTrades && allTrades.length > 0 ? (
        allTrades.slice(0, 4).map((trade) => (
           <TradeCard key={trade.id} trade={trade} />
          
        ))
      ) : (
        <p className="text-gray-700 text-center col-span-3">No trades available.</p>
      )}
    </div>
  </div>
  )
}

export default HomeTrade
