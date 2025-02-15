"use client";
import React, {useState, useEffect, useContext} from 'react'
import { ProductContext } from '../../../utils/prod';
const CartPage = () => {
    const {fetchCart, createCart, updateCart,removeFromCart, loading, cartItem} = useContext(ProductContext);

    useEffect(() => {
        const fetchData = async () => {
            await fetchCart();
            
        }
    },[cartItem]);

    const updateCarts = async () => {
        await updateCart(id, product_qty);
    };

    const deletCart = async () => {
        await removeFromCart(id);
    };

    if (loading) {
        return <p className='mt-24 text-center bold'> Loading ....</p>
    }
  return (
    <div className='mt-24 '>
      {cartItem && cartItem.map((item) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" key={item.id}>
            <div className="flex justify-between items-center mt-4">
                
            </div>
        </div>
      ))}
    </div>
  )
}

export default CartPage
