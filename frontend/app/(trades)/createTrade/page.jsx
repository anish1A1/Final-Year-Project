"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ProductContext} from '../../..//utils/prod';
import { AuthContext } from '../../../utils/auth';

const CreateTradePage = () => {
    const { fetchProduct, products, createTrade, loading, error } = useContext(ProductContext);
    const {user} = useContext(AuthContext);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [requestedProducts, setRequestedProducts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [formError, setFormError] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const handleRequestedProductsChange = (e) => {
        const options = Array.from(e.target.options);
        const selected = options.filter((option) => option.selected).map((option) => option.value);
        setRequestedProducts(selected);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProduct) {
            setFormError('Please select a product to trade.');
            return;
        }
        if (requestedProducts.length === 0) {
            setFormError('Please select at least one product to receive in exchange.');
            return;
        }

        const formData = {
            product: selectedProduct,
            requested_products: requestedProducts,
            user: user.id
        };

        try {
            const response = await createTrade(formData, router);
            setSuccessMessage(response.message);
            setFormError('');
        } catch (error) {
            setFormError(error.message || 'Error creating trade.');
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
                    <div className="mb-4">
                        <label htmlFor="requested-products" className="block text-gray-700 text-lg font-medium mb-2">Products to Receive:</label>
                        <select
                            id="requested-products"
                            multiple
                            value={requestedProducts}
                            onChange={handleRequestedProductsChange}
                            className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                            required
                        >
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
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
