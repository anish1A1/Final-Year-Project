"use client"
import React, {useState, useEffect, useContext} from 'react'
import { ProductContext } from '../../../../utils/prod'
const TradeProductList = () => {
    const {fetchTrades, trades} = useContext(ProductContext);

    useEffect(() => {
        const formData = async () => {
            await fetchTrades();
        }
        formData();
    },[]);
  return (
    <div>
      
    </div>
  )
}

export default TradeProductList;
