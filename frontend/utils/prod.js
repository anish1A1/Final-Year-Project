"use client"
import React, {useState, createContext, useMemo, useContext} from "react";
import { AuthContext } from "./auth";
import axios from "./axios";

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

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




    const prodContextValue = useMemo(() => ({
        products,
        loading,
        error,
        category,
        fetchProduct,
        createProduct,
        fetchCategory,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [products, category, loading, error]); 

    return (
        <ProductContext.Provider value={prodContextValue} > 
        {children}
        </ProductContext.Provider>
    );
}

export {ProductContext}
