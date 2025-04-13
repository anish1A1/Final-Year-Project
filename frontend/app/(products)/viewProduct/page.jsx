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
import ProductCard from "../../components/AllComponents/ProductCard";

const ViewProduct = () => {
  const { fetchProduct, products, loading } = useContext(ProductContext);
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto mt-36 pt-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
    <div className="container mx-auto mt-28 mb-2 px-6 md:px-10">
    {/* Breadcrumb Navigation */}
    <CustomBreadCrumb items={breadCrumbItems} />
  
    {/* Section Title */}
    <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
      Explore Our Products
    </h1>
  
    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
  
  );
};

export default ViewProduct;