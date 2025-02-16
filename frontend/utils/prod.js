"use client"
import React, {useState, createContext, useMemo, useContext} from "react";
import { AuthContext } from "./auth";
import axios from "./axios";

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const [products, setProducts] = useState([]);
    const [ownerProducts, setOwnerProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cartItem, setCartItem] = useState([]);

    const {user} = useContext(AuthContext);


    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/api/product/`);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.log(`Erro Fetching products: ${error}`);
            setError(error.response?.data || error.message);
        }
        finally{
            setLoading(false);
        }
    };

    const createProduct = async (formData, category, router) => {
        const data = new FormData();
    
        // Append all form data to the FormData object
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
    
        if (user) {
            data.append('user', user.id);
        }
    
        console.log(`Creating category: ${formData.category}`);


        if (formData.category) { 
            data.append('category_id', formData.category)
            console.log(`Creating category: ${formData.category}`);
        }
    
        try {
            const response = await axios.post(`/api/product/`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            setProducts((prevProduct) => [
                ...prevProduct,
                response.data
            ]);
            router.push('/viewProduct');
        } catch (error) {
            console.log(`Error creating product: ${error}`);
            setError(error.response?.data || error.message);
        }
    };
    

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`/api/category/`);
            setCategory(response.data);
        } catch (error) {
            console.log(`Error fetching categories: ${error}`);
            setError(error.response?.data || error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const fetchProductByOwner = async () => {
        try {
            const response = await axios.get(`/api/product-user/`);
            setOwnerProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.log(`Erro Fetching products: ${error}`);
            setError(error.response?.data || error.message);
        }
        finally{
            setLoading(false);
        }
    };

    const deleteProduct = async (id, router) => {
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`/api/product-list/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            // Update the state to remove the deleted product
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            setOwnerProducts((prevOwnerProducts) => prevOwnerProducts.filter((ownerProduct) => ownerProduct.id !== id));
            
            router.push('/productDashboard');
            return response.data;
            // Redirect to the product dashboard
    
        } catch (error) {
            console.error(`Error deleting product: ${error}`);
            setError(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const getProductById = async (id) => {
        try {
            const response = await axios.get(`/api/product-list/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product by ID: ${error}`);
            throw error;
        } finally {
            setLoading(false);
        }
    }
    
    const updateProduct = async (id, formData, router) => {
        const token = localStorage.getItem('token');
        const data = new FormData();
    
        // Append all form data to the FormData object
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
    
        if (user) {
            data.append('user', user.id);
        }
        
        try {
            const response = await axios.put(`/api/product-list/${id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setOwnerProducts((prevProducts) => prevProducts.map(item => item.id === id ? response.data : item));
            setProducts((prevProducts) => prevProducts.map(item => item.id === id ? response.data : item));
            router.push('/productDashboard');
        } catch (error) {
            console.error(`Error updating product: ${error}`);
            setError(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/cart/`, {
                headers: {
                'Authorization': `Bearer ${token}`,
                },
            });
            if (response.data.length > 0) {
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

    const updateCart = async (id, product_qty) => {
        try {
            const response = await axios.patch(`/api/cart/${id}/`, {
                product_qty,
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
    



    const prodContextValue = useMemo(() => ({
        products,
        loading,
        error,
        category,
        ownerProducts,
        cartItem,
        fetchProductByOwner,
        fetchProduct,
        createProduct,
        fetchCategory,
        deleteProduct,
        updateProduct,
        getProductById,
        fetchCart,
        addToCart,
        updateCart,
        removeFromCart,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [products, category, cartItem, ownerProducts, loading, error]); 

    return (
        <ProductContext.Provider value={prodContextValue} > 
        {children}
        </ProductContext.Provider>
    );
}

export {ProductContext}
