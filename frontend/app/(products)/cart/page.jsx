"use client";
import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../../utils/prod';

const CartPage = () => {
    const { fetchCart, updateCart, removeFromCart, loading, cartItem, updateCartProductSelection, totalCartAmounts, fetchtotalCartAmount } = useContext(ProductContext);
    const [quantity, setQuantity] = useState({});
    const [selectedItems, setSelectedItems] = useState({});
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await fetchCart();
            // await fetchtotalCartAmount();
        };
        fetchData();
    }, []);
    
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchtotalCartAmount();
        };
        fetchData();
    }, []);

    useEffect(() => {
        const initialQuantities = {};
        const initialSelections = {};
        if (cartItem) {
            cartItem.forEach(item => {
                initialQuantities[item.id] = item.product_qty;
                initialSelections[item.id] = item.is_selected;
            });
            setQuantity(initialQuantities);
            setSelectedItems(initialSelections);
        }
    }, [cartItem]);

    const handleQuantityChange = (id, qty) => {
        setQuantity(prevQuantities => ({
            ...prevQuantities,
            [id]: qty
        }));
    };

    const handleUpdateCart = async (id, product_id) => {
        const product_qty = quantity[id];
        const is_selected = selectedItems[id];
        try {
           
            const response = await updateCart(id, product_qty, product_id, is_selected);
            await fetchtotalCartAmount();
            setSuccessMessage(response.message);

        } catch (error) {
            setError(error.product_qty ? error.product_qty[0] : 'Error updating quantity in cart.');
            console.error('Error updating cart:', error);
        }
    };

    const handleRemoveFromCart = async (id) => {
        try {
            const data = await removeFromCart(id);
            await fetchtotalCartAmount();
            setSuccessMessage(data.message);
        } catch (error) {
            setError(error.message);
            console.error('Error removing item from cart:', error);
        }
    };

    const toggleSelection = async (id, product_id) => {
        const newSelection = {
            ...selectedItems,
            [id]: !selectedItems[id]     // Toggle the selection state
        };
        setSelectedItems(newSelection);

        const is_selected = newSelection[id];  // New selection state (true/false)

        try {
            const response = await updateCartProductSelection(id, is_selected, product_id);
            await fetchtotalCartAmount();
            setSuccessMessage(response.message);

        } catch (error) {
            setError(error.message || 'Error selecting product in cart.');
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
                                value={item.product_qty}
                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                className="w-16 p-2 border rounded"
                                min="1"
                                max={item.product.quantity}
                                disabled
                            />
                            <label htmlFor={`quantity-update-${item.id}`} className="mr-2">Update:</label>
                            <input
                                id={`quantity-update-${item.id}`}
                                type="number"
                                value={quantity[item.id] || 1}
                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                className="w-16 p-2 border rounded"
                                min="1"
                                max={item.product.quantity}
                            />
                            <button
                                onClick={() => handleUpdateCart(item.id, item.product.id)}
                                className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                            <p>Total Cost {item.total_cost} </p>
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                            >
                                Remove
                            </button>
                            <button
                                onClick={() => toggleSelection(item.id, item.product.id)}
                                // value={item.is_selected}
                                className={`py-2 px-4 rounded ${selectedItems[item.id] ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-700'} text-white`}
                            >
                                {/* {selectedItems[item.id] ? 'Deselect' : 'Select'} */}
                                {item.is_selected ? 'De Select' : 'Select'}
                            </button>

                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-lg">Your cart is empty.</p>
            )}

                {totalCartAmounts && totalCartAmounts.total_cost ? (
                    <p className="text-center text-lg">Total Amount: ${totalCartAmounts.total_cost}</p>
                ) : (
                    <p className="text-center text-lg">Nothing to show</p>
                )}
        </div>
    );
};

export default CartPage;
