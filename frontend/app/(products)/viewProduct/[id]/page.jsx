"use client"
import React, { useEffect, useState, useContext } from 'react'
import { ProductContext } from '../../../../utils/prod'
import { useParams } from 'next/navigation'

const ViewProductById = () => {
    const { id } = useParams();
    const { getProductById, loading, addToCart } = useContext(ProductContext);
    const [product, setProducts] = useState(null);
    const [error, setError] = useState('');
    const [productQty, setProductQty] = useState(1);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProducts(data);
            } catch (error) {
                setError('Error fetching product details');
                console.error('Error fetching product details:', error);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="container mx-auto mt-24">Loading...</div>;
    }

    if (!product) {
        return <div className="container mx-auto mt-24">No product found</div>;
    }

    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (productQty < 1) {
            setFormError('Quantity must be at least 1.');
            return;
        }

        try {
            const datas = {
                product: product.id,
                product_qty: productQty

            }
            await addToCart(datas);
            alert('Product added to cart successfully!');
        } catch (error) {
            setFormError('Error adding product to the cart.');
            console.error('Error adding product to the cart:', error);
        }
    };

    return (
        <div className="container mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <h1 className="text-4xl font-bold mb-4 text-center">{product.name}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                    {product.product_image && (
                        <img src={product.product_image} alt={product.name} className="w-full h-full object-cover rounded-lg shadow-lg" />
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-gray-900 font-bold text-xl mb-2">Created By: {product.product_owner}</p>
                    <p className="text-gray-700 text-lg mb-4">{product.small_description}</p>
                    <p className="text-gray-900 text-lg mb-2">Selling Price: <span className="font-semibold">${product.selling_price}</span></p>
                    <p className="text-gray-700 text-lg mb-2">Original Price: <span className="font-semibold">${product.original_price}</span></p>
                    <p className="text-gray-700 text-lg mb-2">Quantity: <span className="font-semibold">{product.quantity}</span></p>
                    <p className="text-gray-700 text-lg mb-2">Tag: <span className="font-semibold">{product.tag}</span></p>
                    <p className="text-gray-700 text-lg mb-2">Delivery Charge: <span className="font-semibold">${product.delivery_sell_charge}</span></p>
                    <p className="text-gray-700 text-lg mb-2">Status: <span className="font-semibold">{product.status ? 'Hidden' : 'Visible'}</span></p>
                    <p className="text-gray-700 text-lg mb-2">Trending: <span className="font-semibold">{product.trending ? 'Yes' : 'No'}</span></p>
                    <p className="text-gray-700 text-lg mb-2">Created At: <span className="font-semibold">{new Date(product.created_at).toLocaleString()}</span></p>
                    <p className="text-gray-700 text-lg mb-2">Total Time (From created Day): <span className="font-semibold">{product.total_time} days</span></p>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                <p className="text-gray-700 text-lg">{product.description}</p>
            </div>
            <form onSubmit={handleAddToCart} className="mt-8">
                <div className="flex flex-col mb-4">
                    <label htmlFor="quantity" className="text-lg font-medium text-gray-700 mb-2">Quantity:</label>
                    <input
                        id="quantity"
                        type="number"
                        value={productQty}
                        onChange={(e) => setProductQty(Number(e.target.value))}
                        className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                        min="1"
                        required
                    />
                </div>
                {formError && <p className="text-red-500 mb-4">{formError}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                    Add to Cart
                </button>
            </form>
        </div>
    );
}

export default ViewProductById;
