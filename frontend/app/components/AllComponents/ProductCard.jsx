'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const router = useRouter();

  return (
    <Card
      key={product.id}
      className="relative shadow-lg border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:border-blue-400"
    >
      {/* Product Image */}
      <div className="overflow-hidden bg-gray-100">
        {product.product_image ? (
          <img
            src={product.product_image}
            alt={product.name}
            className="w-full object-cover rounded-t-lg h-40 transition-transform hover:scale-110 duration-300 cursor-pointer"
            loading="lazy"
            tabIndex={0}
            role="button"
            onClick={() => router.push(`/viewProduct/${product.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') router.push(`/viewProduct/${product.id}`);
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
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold text-gray-800 truncate">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="bg-white">
        {/* Product Description */}
        <p className="text-sm font-medium text-gray-600 line-clamp-2">
          {product.small_description}
        </p>

        {/* Pricing Section */}
        <div className="mt-2 flex justify-between items-center">
          <p className="text-xl font-bold text-green-600">${product.selling_price}</p>
          {product.original_price && (
            <p className="text-base text-gray-400 line-through">${product.original_price}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
