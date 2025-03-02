"use client"
import React, {useState, createContext, useMemo, useContext} from "react";
import { AuthContext } from "./auth";
import axios from "./axios";


const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItem, setCartItem] = useState([]);
    const [totalCartAmounts, setTotalCartAmounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentByUser, setPaymentByUser] = useState([]);
    
    
    const {user} = useContext(AuthContext);
    


    
    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/cart/`, {
                headers: {
                'Authorization': `Bearer ${token}`,
                },
            });
            if (response.data.length > 0) {
            console.log(response.data);

                setCartItem(response.data);
            }
        } catch (error) {
                const errorMessage = error.response?.data || error.message;
                console.error(`Error fetching the cart: ${errorMessage}`);
                throw error.response?.data;;
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (formData) => {
        try {
            const data = new FormData();
            const token = localStorage.getItem('token');
            
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            
            if (user) {
                data.append('user', user.id);
            } else{
                console.log('Please login to add to cart');
            }
            console.log(formData);

            const response = await axios.post(`/api/cart/`,data, {
                headers: {
                'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response.data);
            
            setCartItem((prevCart) => [...prevCart, response.data]);
            return { status: 'success', message: 'Product added to cart successfully!' };
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error adding to cart: ${errorMessage}`);
            throw error.response?.data;  // Throw the error to be caught in the component
        } finally {
            setLoading(false);
        }
    };

    const updateCart = async (id, product_qty, product_id, is_selected) => {
        try {
            
            const response = await axios.patch(`/api/cart/${id}/`, {
                 product_qty, product_id, is_selected
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setCartItem((prevCart) => prevCart.map(item => item.id === id ? response.data : item));
            return { status: 'success', message: 'Cart updated successfully!' };
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error updating cart: ${errorMessage}`);
            throw error.response?.data;   // Throw the error to be caught in the component
        }
    };

    const updateCartProductSelection = async (id, is_selected, product_id) => {
        try {
            
            const response = await axios.patch(`/api/cart/${id}/`, {
                is_selected, product_id
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setCartItem((prevCart) => prevCart.map(item => item.id === id ? response.data : item));
            // Return a message based on selection state
                const message = is_selected 
                ? 'Product Selected successfully!' 
                : 'Product Deselected successfully!';

            return { status: 'success', message };
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error selecting product in cart: ${errorMessage}`);
            throw error.response?.data;   // Throw the error to be caught in the component
        }
    };

    const removeFromCart = async (id) => {
        try {
            await axios.delete(`/api/cart/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCartItem((prevCart) => prevCart.filter(item => item.id !== id));
            return { status: 'success', message: 'Item removed from cart successfully!' };
   
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error removing from cart: ${errorMessage}`);
            throw error.response?.data;  // Throw the error to be caught in the component
        }
    };


    const fetchtotalCartAmount = async () => {
        try {
            const response = await axios.get(`/api/cart/total-cost/`, {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }});
            
            setTotalCartAmounts(response.data);
            console.log(`Total Cart Amounts: ${response.data}`);
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error getting Total Cost from cart: ${errorMessage}`);
            throw error.response?.data; 
        } finally {
            setLoading(false);
        };
    };

    const createPaymentOfCart = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/cart/payment/', formData, {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            setPaymentByUser(response.data);
            return {status: "success", message : "Payment Successfull!"};

        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error Doing Payment: ${errorMessage}`);
            throw error.response?.data;
        }
    };


const cartContext = useMemo(() => ({
    cartItem,
    totalCartAmounts,
    loading,
    paymentByUser,
    fetchCart,
    addToCart,
    updateCart,
    updateCartProductSelection,
    removeFromCart,
    fetchtotalCartAmount,
    createPaymentOfCart,

// eslint-disable-next-line react-hooks/exhaustive-deps
}),[ cartItem, totalCartAmounts,paymentByUser, loading]);

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
};
export {CartContext}