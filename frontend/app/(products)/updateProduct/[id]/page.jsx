"use client";
import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../../../../utils/prod';
import { useParams, useRouter } from 'next/navigation';

const UpdateProduct = () => {
    const { updateProduct, fetchCategory, getProductById, category } = useContext(ProductContext);
    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        slug: '',
        name: '',
        product_image: '',
        small_description: '',
        quantity: 0,
        description: '',
        original_price: 0,
        selling_price: 0,
        tag: '',
        delivery_sell_charge: 0,
        category: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCategory();
                const data = await getProductById(id);
                setFormData({
                    slug: data.slug,
                    name: data.name,
                    product_image: data.product_image, // Set the existing image URL
                    small_description: data.small_description,
                    quantity: data.quantity,
                    description: data.description,
                    original_price: data.original_price,
                    selling_price: data.selling_price,
                    tag: data.tag,
                    delivery_sell_charge: data.delivery_sell_charge,
                    category: data.category.id // Set the existing category ID
                });
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Error fetching product');
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure category_id is set correctly
        const updatedFormData = { ...formData, category_id: formData.category };

        try {
            await updateProduct(id, updatedFormData, router);
        } catch (error) {
            console.log(error);
            setError('Error updating product');
        }
    };

    return (
        <div className="bg-gray-100 mt-24 p-4">
            <h1 className="text-2xl font-bold mb-4">Update Product</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label>Slug:</label>
                    <input 
                        type="text" 
                        name="slug" 
                        value={formData.slug} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        required 
                    />
                </div>
                
                <div className="mb-4">
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label>Description:</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label>Existing Image:</label>
                    {formData.product_image && (
                        <img src={formData.product_image} alt={formData.name} className="mb-4 rounded-lg" />
                    )}
                    <label>New Image:</label>
                    <input 
                        type="file" 
                        name="product_image" 
                        onChange={handleFileChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    />
                </div>
                <div className="mb-4">
                    <label>Category:</label>
                    <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required 
                    >
                        {category && category.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label>Quantity:</label>
                    <input 
                        type="number" 
                        name="quantity" 
                        value={formData.quantity} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label>Original Price:</label>
                    <input 
                        type="number" 
                        name="original_price" 
                        value={formData.original_price} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label>Selling Price:</label>
                    <input 
                        type="number" 
                        name="selling_price" 
                        value={formData.selling_price} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label>Delivery Charge:</label>
                    <input 
                        type="number" 
                        name="delivery_sell_charge" 
                        value={formData.delivery_sell_charge} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label>Small Description:</label>
                    <input 
                        type="text" 
                        name="small_description"  
                        value={formData.small_description} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label>Tag:</label>
                    <input 
                        type="text" 
                        name="tag" 
                        value={formData.tag} 
                        onChange={handleChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
