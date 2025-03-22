"use client";
import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../../../../utils/prod";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const UpdateProduct = () => {
    const { updateProduct, fetchCategory, getProductById, category } = useContext(ProductContext);
    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        slug: "",
        name: "",
        product_image: "",
        small_description: "",
        quantity: 0,
        description: "",
        original_price: 0,
        selling_price: 0,
        tag: "",
        delivery_sell_charge: 0,
        category: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCategory();
                const data = await getProductById(id);
                setFormData({
                    slug: data.slug,
                    name: data.name,
                    product_image: data.product_image,
                    small_description: data.small_description,
                    quantity: data.quantity,
                    description: data.description,
                    original_price: data.original_price,
                    selling_price: data.selling_price,
                    tag: data.tag,
                    delivery_sell_charge: data.delivery_sell_charge,
                    category: data.category.id
                });
                setLoading(false);
            } catch (error) {
                toast.error("Error fetching product:", error);
                setError("Error fetching product");
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = { ...formData, category_id: formData.category };
        try {
            const response = await updateProduct(id, updatedFormData, router);
            toast.success(response?.message );

        } catch (error) {
            const imageError = error.product_image && error.product_image[0];
            if (imageError) {
                toast.error(imageError);
                return;
            }
            toast.error( error.message ||"Error updating product");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-32 bg-gray-50 px-4">
        <Card className="w-full max-w-3xl shadow-lg rounded-2xl py-4 px-8 bg-white">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            ✏️ Update Product
          </h1>
          {error && (
            <p className="text-red-500 text-center font-semibold mb-4">
              {error}
            </p>
          )}
          {loading ? (
            <Skeleton className="w-full h-96 rounded-lg" />
          ) : (
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-3"
            >
              {/* Slug */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </Label>
                <Input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
      
              {/* Name */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
      
              {/* Description */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
      
              {/* Category */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {category?.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
      
              {/* Product Image */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </Label>
                <Input
                  type="file"
                  name="product_image"
                  onChange={handleFileChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
      
              {/* Quantity and Original Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </Label>
                  <Input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price
                  </Label>
                  <Input
                    type="number"
                    name="original_price"
                    value={formData.original_price}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
      
              {/* Selling Price and Delivery Charge */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Selling Price
                  </Label>
                  <Input
                    type="number"
                    name="selling_price"
                    value={formData.selling_price}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Charge
                  </Label>
                  <Input
                    type="number"
                    name="delivery_sell_charge"
                    value={formData.delivery_sell_charge}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
      
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Update Product
              </Button>
            </form>
          )}
        </Card>
      </div>
      
    );
};

export default UpdateProduct;
