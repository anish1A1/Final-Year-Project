"use client";
import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../../utils/prod';

const CartPage = () => {
    const { fetchCart, updateCart, removeFromCart, loading, cartItem } = useContext(ProductContext);
    const [quantity, setQuantity] = useState({});
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await fetchCart();
        };
        fetchData();
    }, []);

    useEffect(() => {
        const initialQuantities = {};
        if (cartItem) {
            cartItem.forEach(item => {
                initialQuantities[item.id] = item.product_qty;
            });
            setQuantity(initialQuantities);
        }
    }, [cartItem]);

    const handleQuantityChange = (id, qty) => {
        setQuantity(prevQuantities => ({
            ...prevQuantities,
            [id]: qty
        }));
    };

    const handleUpdateCart = async (id) => {
        const product_qty = quantity[id];
        try {
            const response =await updateCart(id, product_qty);
            setSuccessMessage(response.message);
        } catch (error) {
            setError(error.product_qty ? error.product_qty[0] : 'Error updating quantity in cart.');

            console.error('Error updating cart:', error);
        }
    };

    const handleRemoveFromCart = async (id) => {
        try {
            const data = await removeFromCart(id);
            setSuccessMessage(data.message);
        } catch (error) {
            setError(error.message);
            console.error('Error removing item from cart:', error);
        }
    };

    if (loading) {
        return <p className="mt-24 text-center font-bold">Loading...</p>;
    }

    return (
        <div className="container mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
            {cartItem && cartItem.length > 0 ? (
                cartItem.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 p-4 border-b">
                        <div className="flex items-center">
                            <img src={item.product.product_image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                            <div>
                                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                <p className="text-gray-700">${item.product.selling_price}</p>
                            </div>
                        </div>
                        <div className="flex items-center">

                        <label htmlFor={`quantity-${item.id}`} className="mr-2">Quantity:</label>
                            <input
                                id={`quantity-${item.id}`}
                                type="number"
                                // value={quantity[item.id] || 1}
                                value={item.product_qty}
                                // onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                className="w-16 p-2 border rounded"
                                min="1"
                                max={item.product.quantity}
                                disabled
                            />

                            <label htmlFor={`quantity-${item.id}`} className="mr-2">Update:</label>
                            <input
                                id={`quantity-${item.id}`}
                                type="number"
                                value={quantity[item.id] || 1}
                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                className="w-16 p-2 border rounded"
                                min="1"
                                max={item.product.quantity}
                            />
                            <button
                                onClick={() => handleUpdateCart(item.id)}
                                className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-lg">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;