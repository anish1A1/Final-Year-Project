"use client";
import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../../../utils/prod";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "../../../../utils/auth";
import { CartContext } from "../../../../utils/cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";
import { motion } from "framer-motion";
import { RotateCcw, MapPin, CheckCircle, User, Truck, CalendarIcon, UsersRound , Clock } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import axios from "../../../../utils/axios";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"



const ViewProductById = () => {
  const { id } = useParams();
  const router = useRouter();
  const { getProductById, loading, createProductChat } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [productQty, setProductQty] = useState(1);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        toast.error("Error fetching product details");
      }
    };
    fetchProduct();
  }, [id]);

  
  

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to add products to the cart.");
      return;
    }
    if (productQty < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }
    try {
      await addToCart({ product_id: product.id, product_qty: productQty, user: user.id });
      toast.success("Product added to cart successfully!");
    } catch (error) {
      if (error.non_field_errors) {
                toast.error(error.non_field_errors[0]);
      } else {
                console.error('Error adding product to the cart:', error);
                toast.error(error ? error.message ? error.non_field_errors : error.message : error.non_field_errors[0]);
    }
      toast.error("Failed to add product to cart");
    }
  };

  const handleUserSelect = async ( product_id) => {
    try {
      console.log("Product ID:", product_id);

        const response = await axios.post(`/api/chat/create-product-chat/${product_id}/`,{}, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }});
        console.log(response.data);
        const data = response.data;
        
        if (data) {

          if (data.message === "Chat already exists.") {
            toast.info("Chat already exists!");
          } else {
            toast.success("Chat created successfully!");
          }
      
          const product = data.product;
          console.log("Product Details:", product);
console.log("Product Image:", product.image);

      router.push('/Chats')

        }


    } catch (error) {
        console.error("Error creating chat:", error);
        toast.error("Error creating chat:", error);

     }
    };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <p className="text-gray-600 text-lg animate-pulse">Loading product details...</p>
        </div>
    );
}

  if (!product) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <p className="text-gray-600 text-lg animate-pulse">No Product Found...</p>
        </div>
    );
}


  return (
    <div className="container mx-auto px-4 py-8 mt-24">
  <BreadCrumbs />

  {product && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-2xl border border-gray-200"
    >
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Product Image */}
        <div>
          <img
            src={product.product_image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl shadow-md mt-1"
          />
          <div className="flex mt-4 space-x-4">
            {[1, 2, 3].map((_, index) => (
              <img
                key={index}
                src={product.product_image}
                alt="Thumbnail"
                className="w-16 h-16 object-cover border border-gray-200 rounded-lg hover:ring-2 hover:ring-blue-500 transition-all"
              />
            ))}
          </div>
          
        </div>

        {/* Product Details */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <CardContent className="space-y-2 bg-white rounded-md shadow-md p-6 border border-gray-200">
            {/* Pricing */}
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
              <p className="text-xl font-bold text-green-600">
                <span className="text-gray-600 block text-sm">Selling Price</span>
                Rs {product.selling_price}/unit
              </p>
              <p className="text-xl font-semibold text-red-500 line-through">
                <span className="text-gray-600 block text-sm">Original Price</span>
                Rs {product.original_price}/unit
              </p>
            </div>

            {/* Available Quantity */}
            <div className="flex justify-between border-t pt-4">
              <p className="text-lg font-medium text-gray-700">
                Available Quantity
              </p>
              <p className="text-lg font-bold text-gray-900">{product.quantity} unit</p>
            </div>

            {/* Delivery Charge */}
            <div className="flex justify-between border-t pt-4">
              <p className="text-lg font-medium text-gray-700">
                Delivery Charge
              </p>
              <p className="text-lg font-bold text-gray-900">
                Rs {product.delivery_sell_charge}
              </p>
            </div>

            {/* Description */}
            <p className="text-md text-gray-700 italic bg-gray-50 p-3 rounded-md">
              {product.small_description}
            </p>

            {/* Tag */}
            <div className="flex items-center border-t pt-4">
              <p className="text-lg font-medium text-gray-700">Tag</p>
              <span className="ml-2 bg-blue-100 text-blue-600 px-3 py-1 text-sm font-bold rounded-full">
                {product.tag}
              </span>
            </div>

            {/* Owner */}
            <div className="flex items-center border-t pt-4">
              <UsersRound className="text-blue-500 w-6 h-6 mr-2" />
              <p className="text-lg text-gray-700">
                <strong>Owner:</strong> {product.product_owner}
              </p>
            </div>
          </CardContent>

          {/* Add to Cart Section */}
          <div className="mt-6 flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleAddToCart} 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow-md">
                    Add to Cart
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add this item to your cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Input
              type="number"
              value={productQty}
              onChange={(e) => setProductQty(Number(e.target.value))}
              min="1"
              max={product.quantity}
              className="w-24 text-center border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Quick Message */}
      <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Message</h2>
        <div className="space-y-4">
          <p className="bg-gray-100 p-3 rounded-md shadow-sm w-fit">
            Hello, you can send a quick message here.
          </p>
          <p className="bg-gray-300 p-3 rounded-md shadow-sm w-fit self-end ml-auto">
            Thank you!
          </p>
          <Input
            placeholder="Type your message..."
            className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow-md" onClick={() => handleUserSelect(product.id)}>Create Chat </Button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="w-full h-40 bg-gray-200 rounded-lg shadow-md hover:ring-2 hover:ring-blue-500 transition-all"
            ></div>
          ))}
        </div>
      </div>
    </motion.div>
  )}
</div>

  );
};

export default ViewProductById;
