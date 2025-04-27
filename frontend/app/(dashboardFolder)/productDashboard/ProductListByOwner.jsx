"use client"
import React, {useContext, useEffect} from 'react'
import { ProductContext } from '../../../utils/prod'
import {useRouter} from 'next/navigation';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, PackageCheck, Clock, MapPin, DollarSign, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
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
    const response = await deleteProduct(id, router);
    toast.success(response.message || 'Product deleted successfully');
  }

  const updateProduct = async (id) => {
    router.push(`/MyProducts/updateProduct/${id}`);
  }
  if(loading){
    return <div className="flex justify-center items-center mt-36 text-2xl font-semibold text-gray-700">Loading...</div>
  };  

    if (!ownerProducts || ownerProducts.length === 0) {
      return <div className="container mx-auto mt-36 px-64 text-2xl font-semibold text-gray-700">No products created by you</div>;
    };

    return (
      <div className="container mx-auto px-6">
      <h1 className="text-3xl font-medium  text-gray-800 mb-4">
        📦 Product List
      </h1>
    
      <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {ownerProducts &&
          ownerProducts.map((product) => (
            <Card
              key={product.id}
             className="relative shadow-lg border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition-transform transform "
            >
              {/* Product Image and Badge */}
              <CardHeader className="overflow-hidden bg-white">
                {product.product_image && (
                  <img
                    src={product.product_image}
                    alt={product.name}
                     className="w-full  object-cover rounded-lg h-48 transition-transform hover:scale-105 duration-300 cursor-pointer"
                    loading="lazy"
                    tabIndex={0} // Makes the element focusable
                    role="button"
                    onClick={() => router.push(`/viewProduct/${product.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") router.push(`/viewProduct/${product.id}`);
                    }}
                  
                  />
                )}
              </CardHeader>
                <Badge className="absolute top-4 left-4 bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-md shadow-md">
                    {product.tag || "No Tag"}
                  
                </Badge>
    
              {/* Product Details */}
              <CardContent className="px-4 space-y-3">
                <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 text-sm">{product.small_description}</p>
                <div className="grid grid-cols-2 gap-x-4 text-gray-700">
                  <p>
                    <strong>Price:</strong> Rs.{product.original_price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  
                  <p className='flex items-center gap-2 '>
                  <strong className=''>Created At:</strong>{" "}
                  {new Date(product.created_at).toLocaleDateString()}
                </p>

                </div>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      product.status ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}
                  >
                    {product.status ? "Hidden" : "Visible"}
                  </span>
                </p>
              </CardContent>
    
              {/* Actions */}
              <CardFooter className="px-4 flex justify-between items-end">
                <button
                  onClick={() => deletProduct(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete Product
                </button>
                <button
                  onClick={() => updateProduct(product.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Update Product
                </button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
    
  )
}

export default ProductListByOwner
