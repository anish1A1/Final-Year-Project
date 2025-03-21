"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ProductContext} from '../../..//utils/prod';
import { AuthContext } from '../../../utils/auth';
import { toast } from 'sonner';
import { RotateCcw, MapPin, CheckCircle, User, Truck, CalendarIcon, UsersRound , Clock } from "lucide-react";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { format } from 'date-fns';


const CreateTradePage = () => {
    const { fetchProductByOwner, ownerProducts, createTrade, loading, error } = useContext(ProductContext);
    const {user} = useContext(AuthContext);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formError, setFormError] = useState('');
    
    const router = useRouter();


    const [formData, SetFormData] = useState({
        product_id: '',
        wanted_product: '',
        wanted_quantity: 0,
        trading_quantity: 0,
        note: '',
        trade_ending_date: '',
    })

    useEffect(() => {
        fetchProductByOwner();
    }, []);

    const handleProductChange = (e) => {
        const value = e.target.value;
        setSelectedProduct(value);  // Set the selected product's ID
        SetFormData((prevData) => ({
            ...prevData,
            product_id: value,  // Ensure it's the ID, not name
        }));
        // console.log(`value is ${value}`);
    };

    const handleChange = (e) => {
        const {name, value, type} = e.target;
        SetFormData({
            ...formData,
            [name]: type === 'checkbox' ? e.target.checked : value
        });
    };

    

   
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.product_id) {
            setFormError('Please select a product to trade.');
            toast.error('Please select a product to trade.');

            return;
        }
        
        try {
            console.log(formData);
            const response = await createTrade(formData, router);
            setSuccessMessage(response.message);
            toast.success(response.message);
            setFormError('');
        } catch (error) {
            const errorMessage = Array.isArray(error.error) ? error.error[0] : "Error creating trade";
            setFormError(error.message || 'Error creating trade.');
            if (errorMessage) {  
                toast.error(errorMessage);
            } 
            toast.error( error.message || 'Error creating trade.');
            console.error('Error creating trade:', error);
        }
    };

    return (
        <div className="mt-24   bg-gray-100">

            <div className="flex justify-center items-center ">
                <Card className="w-full max-w-2xl shadow-lg rounded-2xl mt-3"  >
                    <div className="p-3 border-b bg-gray-100">
                        
                        <BreadCrumbs />
                    </div>    
                    
                    
                    <CardHeader >
                        <CardTitle className="text-2xl font-bold text-center"    >

                    Create Trade 
                        </CardTitle>
                        
                        </CardHeader>

                        <CardContent>

                        {loading ? (
                <p className="text-center">Loading products...</p>
            ) : (
                <form onSubmit={handleSubmit} className='grid gap-4'>
                    <div className="">
                        <label htmlFor="product" className="block text-gray-700 text-lg font-medium mb-2">Product to Trade:</label>
                        <select
                            id="product"
                            name="product"
                            value={selectedProduct}
                            onChange={handleProductChange}
                            className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                            required
                        >
                            <option value="">Select a product to give. </option>
                            {ownerProducts.map((product_id) => (
                                <option key={product_id.id} value={product_id.id}>{product_id.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="">
                        <label>Wanted Product:</label>
                        <input
                            type="text"
                            name="wanted_product"
                            value={formData.wanted_product}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            placeholder='Product you want...'

                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <label>Wanted Quantity:</label>
                        <input
                            type="number"
                            name="wanted_quantity"
                            min='1'
                            value={formData.wanted_quantity}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            placeholder='Quantity you want..'

                        />
                    </div>

                    <div className="">
                        <label>Available Quantity:</label>
                        <input
                            type="number"
                            name="trading_quantity"
                            min='1'
                            value={formData.trading_quantity}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            placeholder='Available Quantity you have..'
                        />
                    </div>


                    </div>


                    <div className="">
                        <label>Trade Ending Date</label>
                        <input
                            type="date"
                            name="trade_ending_date"
                            value={formData.trade_ending_date}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>

                    

                    <div className="mb-4">
                        <label>Note for the Trade:</label>
                        <Textarea
                            type="text"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  "
                            required
                            placeholder='e.g. I want to a high quality product...'
                        />
                    </div>

                        <Button
                            type="submit"
                            className="w-full  text-white  hover:bg-blue-700"
                        >
                            Create Trade
                        </Button>
                    </form>
                )}
        </CardContent>
            
                    </Card>
            </div>
            
            
        </div>
    );
};

export default CreateTradePage;
