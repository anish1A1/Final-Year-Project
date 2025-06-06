"use client"
import React, {useState, createContext, useMemo, useContext} from "react";
import { AuthContext } from "./auth";
import axios from "./axios";

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const {user} = useContext(AuthContext);
    
    const [products, setProducts] = useState([]);
    const [ownerProducts, setOwnerProducts] = useState([]);
    const [category, setCategory] = useState([]);

    const [trades, setTrades] = useState([]);
    const [tradeRequests, setTradeRequests] = useState([]);
    const[allTrades, setAllTrades] = useState([]);
    const [tradeRequestsOfOwner, setTradeRequestsOfOwner] = useState([]);

    const [confirmedTrades, setConfirmedTrades] = useState([]);
    const [confirmedTradesOfOwner, setConfirmedTradesOfOwner] = useState([]);
    const [sliderData, setSliderData] = useState([]);

    const [tradeById, setTradeById] = useState([]);

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

    const fetchSliderDatas = async () => {
        try {
            const response = await axios.get(`/api/slider-data/`);
            setSliderData(response.data);
            console.log(response.data);
            setLoading(false);

        } catch (error) {
             console.log(`Erro Fetching products: ${error}`);
            setError(error.response?.data || error.message);
        } finally{
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
            return {status : "success", message: "Product has been created successfully!"}
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
            console.log(response.data);
            setLoading(false);
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
            router.push('/MyProducts');
            return {status: 'success' , message: 'Product Updated Successfully!'};
        } catch (error) {
            console.error(`Error updating product: ${error}`);
            setError(error.response?.data || error.message);
            throw error.response?.data;
        } finally {
            setLoading(false);
        }
    };




    // Trade Related Logics

    
    const fetchTrades = async () => {
        try {
            const response = await axios.get('/api/trades/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setTrades(response.data);
            console.log(response.data);
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createTrade = async (formData, router) => {
        try {
            const data = new FormData();
            const token = localStorage.getItem('token');    
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (user) {
                data.append('user', user.id);
            } 
            const response = await axios.post('/api/trades/', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTrades((prevTrades) => [...prevTrades, response.data]);
            router.push('/allTrades'); // Redirect to the trades page after creating the trade
            return { status: 'success', message: 'Trade created successfully!' };
            
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error creating trade: ${errorMessage}`);
            throw error.response?.data;
        }; 
    };

    const fetchAllTrades = async () => {
        try {
            const response = await axios.get('/api/trades-all/', {});
            setAllTrades(response.data);
            
        } catch (err) {
            if(err.response?.status === 401){
                console.error('Unauthenticated, Please login');
            }
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getTradeById = async (id) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/trade-Toupdate/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    },
                    });
                    console.log(response.data);
                    setTradeById(response.data);
            
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error getting trade by ID: ${errorMessage}`);
            throw error.response?.data;
        }
        finally {
            setLoading(false);
        }
    };

    const UpdateTradeById = async (id, data) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`/api/trade-Toupdate/${id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    },
                    });
                    setTrades(prevData => prevData.filter(data => data.id === id ? response.data : data));
            return {status: "success", message: "Trade was updated successfully!"};
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error updating the trade: ${errorMessage}`);
            throw error.response?.data;
        }
    };

    const deleteTradeById = async (id) => {
        try {
            const token = localStorage.getItem('token');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await axios.delete(`/api/trade-Toupdate/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    },
                    });
                    setTrades(prevData => prevData.filter(data => data.id !== id));
            return {status: "success", message: "Trade was deleted successfully!"};
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error deleting the trade: ${errorMessage}`);
            throw error.response?.data;
        }
    }

    const fetchTradeRequests = async () => {
        try {
            const response = await axios.get(`/api/trade-requests/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setTradeRequests(response.data);
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };

    const createTradeRequest = async (formData) => {
        try {
            const data = new FormData();
            const token = localStorage.getItem('token');

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if(user){
                data.append('user', user.id);
            }

            const response = await axios.post('/api/trade-requests/', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setTradeRequests((prevRequests) => [...prevRequests, response.data]);
            return { status: 'success', message: 'Trade request created successfully!' };
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error creating trade request: ${errorMessage}`);
            throw error.response?.data;
        } finally {
            setLoading(false);
        }
    };


    const getTradeRequestsFromUsers = async () => {
        try {
            const response = await axios.get('/api/trade-request-owners/', {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.data.length > 0) {
                setTradeRequestsOfOwner(response.data);
            }
            console.log("Trade Requests Data:", response.data);

        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error Getting Trade's Request: ${errorMessage}`);
            throw error.response?.data;
        } finally {
            setLoading(false);
        }
    }

    const updateTradeRequestStatus = async (id, status) => {
        try {
            const response = await axios.patch(`/api/trade-request-owners/${id}/`, {
                status,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setTradeRequestsOfOwner((prevRequest) => prevRequest.map(item => item.id === id ? response.data : item));
            return { status: 'success', message: 'Updated the trade request successfully!' };
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error updating Trade's Request: ${errorMessage}`);
            throw error.response?.data;   // Throw the error to be caught in the component
        }
    };
    


    // All the Confirmed Trades are available here
    const fetchConfirmedTradesByOwner = async () => {
        try {
            const response = await axios.get('/api/confirmed-trades-by-owners/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.data.length > 0) {
                setConfirmedTradesOfOwner(response.data);
            }
            setLoading(false);
            console.log('Fetched Confirmed Trades By Owner:', response.data);
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error Fetching Confirmed Trade's Request: ${errorMessage}`);
            throw error.response?.data;   // Throw the error to be caught in the component
        }finally{
            setLoading(false);
        }
    };


    const updateConfirmedTrade = async (id, data) => {
        try {
            const response = await axios.patch(`/api/confirmed-trades-by-owners/update/${id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setConfirmedTradesOfOwner((prevRequest) => prevRequest.map(item => item.id === id ? response.data : item));
            return { status: 'success', message: 'Updated the Trade successfully!' };
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error Updating Confirmed Trade's Request: ${errorMessage}`);
            throw error.response?.data;   // Throw the error to be caught in the component
        }

    };

    //for Normal User

    const fetchAllConfirmedTradesOfUser = async () => {
        try {
            const response = await axios.get('/api/confirmed-trades/', {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
          
                setConfirmedTrades(response.data);
          

        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error Fetching Confirmed Trade's Request: ${errorMessage}`);
            throw error.response?.data; 
        }
        finally{
            setLoading(false);
        }
    };


    const updateConfirmedTradeByUser = async (id, data) => {
        try {
            const response = await axios.patch(`/api/confirmed-trades-by-users/update/${id}/`, data, {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,

                },
            });
            setConfirmedTrades((prevRequest) => prevRequest.map(item => item.id === id ? response.data : item));
            return { status: 'success', message: 'Updated the trade received!' };
            
        }catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error Updating Confirmed Trade's Request By User: ${errorMessage}`);
            throw error.response?.data; 
        }
    };


    const createProductChat = async (productId) => {
        try {
            const response = await axios.post(`/api/chat/create-product-chat/${productId}/`, {
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);

        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error(`Error Creating Product Chat: ${errorMessage}`);
            throw error.response?.data; 
        }
    }



    




    const prodContextValue = useMemo(() => ({
        products,
        loading,
        error,
        category,
        ownerProducts,
        trades,
        tradeRequests,
        allTrades,
        tradeRequestsOfOwner,
        confirmedTradesOfOwner,
        confirmedTrades,
        tradeById,
        sliderData,
        fetchProductByOwner,
        fetchProduct,
        createProduct,
        fetchCategory,
        deleteProduct,
        updateProduct,
        getProductById,
        fetchSliderDatas,
        fetchTrades,
        createTrade,
        fetchTradeRequests,
        createTradeRequest,
        fetchAllTrades,
        getTradeById,
        UpdateTradeById,
        deleteTradeById,
        getTradeRequestsFromUsers,
        updateTradeRequestStatus,
        fetchConfirmedTradesByOwner,
        updateConfirmedTrade,
        fetchAllConfirmedTradesOfUser,
        updateConfirmedTradeByUser,
        
        createProductChat,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [products, category,  trades, allTrades, sliderData, confirmedTrades, tradeById, confirmedTradesOfOwner, tradeRequestsOfOwner, tradeRequests, ownerProducts, loading, error]); 

    return (
        <ProductContext.Provider value={prodContextValue} > 
        {children}
        </ProductContext.Provider>
    );
}
export {ProductContext};