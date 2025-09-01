"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ProductContext } from "../../../../utils/prod";
import { AuthContext } from "../../../../utils/auth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";

const CreateProduct = () => {
  const { user } = useContext(AuthContext);
  const { createProduct, fetchCategory, category } = useContext(ProductContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    product_image: null,
    small_description: "",
    quantity: 0,
    description: "",
    original_price: 0,
    selling_price: 0,
    tag: "",
    delivery_sell_charge: 75,
    category: "",
  });

  useEffect(() => {
    const fetchFields = async () => {
      await fetchCategory();
    };
    fetchFields();
  }, []);

  useEffect(() => {
    if (category.length > 0 && !formData.category) {
      setFormData((prev) => ({
        ...prev,
        category: category[0].id,
      }));
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
            if (formData.product_image === null) {
                toast.error('Please select an image');
            }
            if (formData.category === '') {
                toast.error('Please select a category');
            }
            if (formData.original_price === 0 || formData.selling_price === 0) {
                toast.error('Please enter a valid price');
            }
            if (formData.original_price < formData.selling_price) {
                toast.error('Selling price must be greater than original price');
            }
    try {
      const response = await createProduct(formData, category, router);
      if (response.status === 200) {
        toast.success(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className=" bg-gray-100">
         <div className="flex justify-center items-center pt-4">

      <Card className="w-full max-w-2xl shadow-lg rounded-xl bg-white ">
        <div className=" p-3 border-b bg-gray-100 ">
            <BreadCrumbs />
         </div>
        <CardHeader className='text-2xl font-bold text-center'>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Slug */}
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug (same as name)</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows='2'
                required
              />
            </div>

            {/* Product Image */}
            <div className="grid gap-2">
              <Label htmlFor="product_image">Product Image</Label>
              <Input
                id="product_image"
                name="product_image"
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                            className=" text-slate-800 hover:border-gray-500"
              />
            </div>

            {/* Category */}
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {category?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity (Kg)</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            {/* Original Price */}
            <div className="grid gap-2">
              <Label htmlFor="original_price">Original Price</Label>
              <Input
                id="original_price"
                name="original_price"
                type="number"
                value={formData.original_price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Selling Price */}
            <div className="grid gap-2">
              <Label htmlFor="selling_price">Selling Price</Label>
              <Input
                id="selling_price"
                name="selling_price"
                type="number"
                value={formData.selling_price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Delivery Charge */}
            <div className="grid gap-2">
              <Label htmlFor="delivery_sell_charge">Delivery Charge</Label>
              <Input
                id="delivery_sell_charge"
                name="delivery_sell_charge"
                type="number"
                value={formData.delivery_sell_charge}
                onChange={handleChange}
                disabled
              />
            </div>

            {/* Small Description */}
            <div className="grid gap-2">
              <Label htmlFor="small_description">Small Description</Label>
              <Input
                id="small_description"
                name="small_description"
                value={formData.small_description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tag */}
            <div className="grid gap-2">
              <Label htmlFor="tag">Tag</Label>
              <Input
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit">
                Create Product
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
         </div>
    </div>
  );
};

export default CreateProduct;
