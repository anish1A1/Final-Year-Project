"use client"
import React, {useContext, useEffect} from 'react'
import { ProductContext } from '../../../utils/prod'
import {useRouter} from 'next/navigation';
const ProductListByOwner = () => {
    const {fetchProductByOwner, ownerProducts, loading,deleteProduct } = useContext(ProductContext);
    const router = useRouter();
    
  useEffect(() => {
    const fetchProduct = async () => {
        await fetchProductByOwner();
    }
    fetchProduct();
  }, []);

  const deletProduct = async (id) => {
    await deleteProduct(id, router);
  }

  const updateProduct = async (id) => {
    router.push(`/updateProduct/${id}`);
  }
  
    if (loading) {
        return <div className="container mx-auto mt-24">Loading...</div>;
    };   

    if (!ownerProducts) {
      return <div className="container mx-auto mt-24">No products created by you</div>;
    };

    return (
        <div className="container mx-auto mt-24">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ownerProducts.map((product) => (
                <div key={product.id} className="bg-white border rounded-lg p-4 shadow-md">
                    {product.product_image && (
                        <img src={product.product_image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                    )}
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p className="text-gray-700">{product.small_description}</p>
                    <p className="text-gray-900 font-bold mt-2">Selling Price: ${product.selling_price}</p>
                    <p className="text-gray-700 mt-2">Original Price: ${product.original_price}</p>
                    <p className="text-gray-700 mt-2">Quantity: {product.quantity}</p>
                    <p className="text-gray-700 mt-2">Tag: {product.tag}</p>
                    <p className="text-gray-700 mt-2">Delivery Charge: ${product.delivery_sell_charge}</p>
                    <p className="text-gray-700 mt-2">Status: {product.status ? 'Hidden' : 'Visible'}</p>
                    <p className="text-gray-700 mt-2">Trending: {product.trending ? 'Yes' : 'No'}</p>
                    <p className="text-gray-700 mt-2">Created At: {new Date(product.created_at).toLocaleString()}</p>

                    <p className="text-gray-700 mt-2">Total Time(From created Day): {product.total_time}</p>
                    <div className="flex justify-between">
                    <button onClick={() => deletProduct(product.id)}>Delete Product</button>
                    <button onClick={() => updateProduct(product.id)}>Update Product</button>

                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProductListByOwner
