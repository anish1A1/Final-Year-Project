"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProductContext } from '../../../utils/prod';

const CreateTradeRequestPage = () => {
    const { id } = useParams();
    const { fetchProduct, products, createTradeRequest, loading, error } = useContext(ProductContext);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formError, setFormError] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProduct) {
            setFormError('Please select a product to offer for trade.');
            return;
        }

        const formData = {
            trade: id,
            requested_product: selectedProduct,
        };

        try {
            const response = await createTradeRequest(formData);
            setSuccessMessage(response.message);
            setFormError('');
            router.push(`/trades/${id}/requests`); // Redirect to the trade requests page after creating the request
        } catch (error) {
            setFormError(error.message || 'Error creating trade request.');
            console.error('Error creating trade request:', error);
        }
    };

    return (
        <div className="container mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Create Trade Request</h1>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            {loading ? (
                <p className="text-center">Loading products...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="product" className="block text-gray-700 text-lg font-medium mb-2">Product to Offer:</label>
                        <select
                            id="product"
                            value={selectedProduct}
                            onChange={handleProductChange}
                            className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                            required
                        >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Create Trade Request
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateTradeRequestPage;
