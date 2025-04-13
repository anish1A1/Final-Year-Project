"use client";
import { ProductContext } from '../../utils/prod'
import ProductCard from '../../app/components/AllComponents/ProductCard'
import { useRouter } from "next/navigation";
import React, { useEffect, useContext } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HomeProduct = () => {

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
    

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.slice(0, 8).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      
    </div>
  )
}

export default HomeProduct
