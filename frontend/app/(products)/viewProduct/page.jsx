"use client";
import React, { useEffect, useContext } from "react";
import { ProductContext } from "../../../utils/prod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ViewProduct = () => {
  const { fetchProduct, products, loading } = useContext(ProductContext);
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={`skeleton-${index}`} className="h-80 w-full rounded-lg" />
        ))}
      </div>
    );
  }


  return (
    <div className="container mx-auto mt-16 px-4 md:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="shadow-xl border rounded-xl overflow-hidden hover:shadow-2xl transition-all">
            {product.product_image && (
              <img
                src={product.product_image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
            )}
            <CardHeader className="p-4">
              <CardTitle className="text-2xl font-semibold text-gray-900 truncate">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-gray-700 space-y-2">
              <p className="text-lg font-medium text-gray-600 truncate">{product.small_description}</p>
              <div className="flex justify-between items-center text-gray-900 font-bold text-xl">
                <span>Price: ${product.selling_price}</span>
                <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
              </div>
              <div className="grid grid-cols-2 text-sm text-gray-600 gap-2">
                <p>Quantity: {product.quantity}</p>
                <p>Tag: {product.tag}</p>
                <p>Delivery: ${product.delivery_sell_charge}</p>
                <p>Owner: {product.product_owner}</p>
              </div>
              <Button
                className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
                onClick={() => router.push(`/viewProduct/${product.id}`)}
              >
                View Product
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;