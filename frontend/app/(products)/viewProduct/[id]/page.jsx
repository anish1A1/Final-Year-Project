"use client";
import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../../../utils/prod";
import { useParams } from "next/navigation";
import { AuthContext } from "../../../../utils/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CartContext } from "../../../../utils/cart";

const ViewProductById = () => {
  const { id } = useParams();
  const { getProductById, loading } = useContext(ProductContext);
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
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-500 text-xl mt-20">No product found</div>;
  }

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
      console.log(product.id, productQty, user.id);
      await addToCart({product_id: product.id, product_qty: productQty, user: user.id });
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

  return (
    <div className="container mx-auto px-4 py-10 mt-24">
      <Card className="max-w-5xl mx-auto p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              {product.product_image && (
                <img
                  src={product.product_image}
                  alt={product.name}
                  className="rounded-lg shadow-lg w-full max-h-96 object-cover hover:scale-105 transition-transform"
                />
              )}
            </div>
            <div>
              <p className="text-gray-700 text-lg"><strong>Owner:</strong> {product.product_owner}</p>
              <p className="text-gray-700 text-lg"><strong>Price:</strong> ${product.selling_price}</p>
              <p className="text-gray-700 text-lg"><strong>Quantity Available:</strong> {product.quantity}</p>
              <p className="text-gray-700 text-lg"><strong>Tag:</strong> {product.tag}</p>
              <p className="text-gray-700 text-lg"><strong>Delivery Charge:</strong> ${product.delivery_sell_charge}</p>
              <p className="text-gray-700 text-lg"><strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}</p>
              <p className="text-gray-700 text-lg"><strong>Total Time Active:</strong> {product.total_time} days</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Product Description</h2>
            <p className="text-gray-700 text-lg mt-2">{product.description}</p>
          </div>
          <form onSubmit={handleAddToCart} className="mt-6">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={productQty}
                onChange={(e) => setProductQty(Number(e.target.value))}
                min="1"
                max={product.quantity}
                required
                className="w-24"
              />
              <Button type="submit">Add to Cart</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewProductById;
