"use client"
import React, {useState, createContext, useMemo, useContext} from "react";
import { AuthContext } from "./auth";
import axios from "./axios";

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const [products, setProducts] = useState([]);

    const user = useContext(AuthContext);


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

    const createProduct = async (formDate, router) => {
        
        const data = new FormData();

        for(let data in formDate) {
            data.append(key, formDate[key]);
        } 
        if(user){
            data.append('user', user.id);
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
            router.push('/product');
        } catch (error) {
            console.log(`Error creating product: ${error}`);
            setError(error.response?.data || error.message);
        }
    };




    const prodContextValue = useMemo(() => ({
        products,
        loading,
        error,
        fetchProduct,
        createProduct,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [products, loading, error]); 

    return (
        <ProductContext.Provider value={prodContextValue} > 
        {children}
        </ProductContext.Provider>
    );
}

