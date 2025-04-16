"use client"
import React, { useEffect, useContext} from 'react'
import { ProductContext } from '../../../utils/prod'

import BreadCrumbs from "@/Impcomponent/BreadCrumbs";
import TradeCard from '../../components/AllComponents/TradeCard';
import { AuthContext } from '../../../utils/auth';
const AllTrades = () => {
    const {fetchAllTrades, allTrades, loading} = useContext(ProductContext);
    const {user} = useContext(AuthContext);
    useEffect(() => {
        const formData = async () => {
            await fetchAllTrades();
        }
        formData();
    },[]);

    if (!user) {
      toast.info("Please login to access more pages!");
      router.push('/login');
    }


    if(loading){
        return <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-700">Loading...</div>
      }


  return (
    <div className="container mx-auto mt-28 px-6">
        <BreadCrumbs />
    {/* <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">All Trades</h1>1 */}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 mb-2">
      {allTrades && allTrades.length > 0 ? (
        allTrades.map((trade) => (
           <TradeCard key={trade.id} trade={trade} />
          
        ))
      ) : (
        <p className="text-gray-700 text-center col-span-3">No trades available.</p>
      )}
    </div>
  </div>
);
};



export default AllTrades;