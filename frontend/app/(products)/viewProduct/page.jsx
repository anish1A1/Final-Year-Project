"use client";
import React, { useEffect, useContext, lazy } from "react";
import { ProductContext } from "../../../utils/prod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CustomBreadCrumb from "@/ImpComponent/CustomBreadCrumb";
import { Badge } from "@/components/ui/badge";
import { Link } from "lucide-react";

const ViewProduct = () => {
  const { fetchProduct, products, loading } = useContext(ProductContext);
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={`skeleton-${index}`} className="h-80 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  const breadCrumbItems = [
  {label : 'Home', href: '/'},
  {label : 'Product'},

    ]


  return (
    <div className="container mx-auto mt-28 px-6 md:px-10">
    {/* Breadcrumb Navigation */}
    <CustomBreadCrumb items={breadCrumbItems} />
  
    {/* Section Title */}
    <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
      Explore Our Products
    </h1>
  
    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {products.map((product) => (
        <Card
          key={product.id}
          className="relative shadow-lg border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:border-blue-400 "

          
        >
          {/* Product Image */}
          <div className="overflow-hidden bg-gray-100">
                {product.product_image ? (
                    <img
                    src={product.product_image}
                    alt={product.name}
                    className="w-full  object-cover rounded-t-lg h-40 transition-transform hover:scale-110 duration-300 cursor-pointer"
                    loading="lazy"
                    tabIndex={0} // Makes the element focusable
                    role="button" // Identifies it as an interactive element
                    onClick={() => router.push(`/viewProduct/${product.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") router.push(`/viewProduct/${product.id}`);
                    }}
                  />
                  
                ) : (
                    <div className="flex items-center justify-center w-full h-64 bg-gray-200 text-gray-500 rounded-t-lg">
                    No Image Available
                    </div>
                )}
                </div>
  
          {/* Category Badge */}
          <Badge className="absolute top-4 left-4 bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-md shadow-md">
            {product.category?.name}
          </Badge>
  
          {/* Card Details */}
          <CardHeader className="p-4 ">
            <CardTitle className="text-lg font-bold text-gray-800 truncate">
              {product.name}
            </CardTitle>
          </CardHeader>
  
          <CardContent className=" bg-white">
            {/* Product Description */}
            <p className="text-sm font-medium text-gray-600 line-clamp-2">
              {product.small_description}
            </p>
  
            {/* Pricing Section */}
            <div className="mt-2 flex justify-between items-center">
              <p className="text-xl font-bold text-green-600">
                ${product.selling_price}
              </p>
              {product.original_price && (
                <p className="text-base text-gray-400 line-through">
                  ${product.original_price}
                </p>
              )}
            </div>
  
            {/* View Product Button */}
            {/* <Button
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg shadow-lg transition-all"
              onClick={() => router.push(`/viewProduct/${product.id}`)}
            >
              View Product
            </Button> */}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
  
  );
};

export default ViewProduct;