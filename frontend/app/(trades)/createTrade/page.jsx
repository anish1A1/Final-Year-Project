"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ProductContext} from '../../..//utils/prod';
import { AuthContext } from '../../../utils/auth';
import { toast } from 'sonner';

const CreateTradePage = () => {
    const { fetchProductByOwner, ownerProducts, createTrade, loading, error } = useContext(ProductContext);
    const {user} = useContext(AuthContext);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formError, setFormError] = useState('');
    const router = useRouter();

    const [formData, SetFormData] = useState({
        product_id: '',
        user : '',
        wanted_product: '',
        wanted_quantity: 0,
        wanted_price: 0,
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
            return;
        }
        
        try {
            console.log(formData);
            const response = await createTrade(formData, router);
            setSuccessMessage(response.message);
            toast.success(response.message);
            setFormError('');
        } catch (error) {
            setFormError(error.message || 'Error creating trade.');
            toast.error(error.message || 'Error creating trade.');
            console.error('Error creating trade:', error);
        }
    };

    return (
        <div className="container mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Create Trade</h1>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            {loading ? (
                <p className="text-center">Loading products...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="product" className="block text-gray-700 text-lg font-medium mb-2">Product to Trade:</label>
                        <select
                            id="product"
                            name="product"
                            value={selectedProduct}
                            onChange={handleProductChange}
                            className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                            required
                        >
                            <option value="">Select a product</option>
                            {ownerProducts.map((product_id) => (
                                <option key={product_id.id} value={product_id.id}>{product_id.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label>Wanted Product:</label>
                        <input
                            type="text"
                            name="wanted_product"
                            value={formData.wanted_product}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label>Wanted Quantity:</label>
                        <input
                            type="number"
                            name="wanted_quantity"
                            value={formData.wanted_quantity}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label>Wanted Price:</label>
                        <input
                            type="number"
                            name="wanted_price"
                            value={formData.wanted_price}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label>Trade Ending Date</label>
                        <input
                            type="date"
                            name="trade_ending_date"
                            value={formData.trade_ending_date}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label>Note for the Trade:</label>
                        <input
                            type="text"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Create Trade
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateTradePage;
