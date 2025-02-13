"use client"
import React, {useState, useContext, useEffect} from 'react'
import { ProductContext } from '../../../utils/prod'
import { AuthContext } from '../../../utils/auth'
import { useRouter } from 'next/navigation'
const CreateProduct = () => {
    const {user} = useContext(AuthContext);

    const {createProduct, products, fetchCategory, category } = useContext(ProductContext);

    useEffect(() => {
        const fetchFields = async () => {
           
            await fetchCategory();
        }
        fetchFields();
    }, []);

    const [formData, setFormData] = useState({
        slug : '',
        name : '',
        product_image : null,
        small_description : '',
        quantity : 0,
        description : '',
        original_price : 0,
        selling_price : 0,
        tag: '',
        delivery_sell_charge : 0,
        category: ''
    });

    const router = useRouter();

    const handleChange = (e) => {
        const {name, value,type} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleFileChange= (e) => {
        const {name,files} = e.target;
        setFormData({
            ...formData,
            [name] : files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(formData, category, router);
        } catch (error) {
            console.log(error);
        }
    }
    console.log('Category:', category);  // Debugging category state


  return (
    <div className="bg-gray-100 mt-24 p-4">
    <h1 className="text-2xl font-bold mb-4">Create Products</h1>
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label>Slug(same as name):</label>
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
            <label>Image:</label>
            <input 
                type="file" 
                name="product_image" 
                onChange={handleFileChange} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            />
        </div>
        <div className="mb-4">
            <label>Category</label>
            <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                {category && category.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
        <div className="mb-4">
            <label>Quantity(in Kg):</label>
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
            Create Products
        </button>
    </form>   
</div>
  )
}

export default CreateProduct
