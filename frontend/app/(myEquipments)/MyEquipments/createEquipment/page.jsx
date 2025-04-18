"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { EquipmentContext } from "../../../../utils/equip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";


const CreateEquipment = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    availability_status: true,
    quantity: 0,
    per_day_rate: 0,
    user_manual: null,
    delivery_charge: 0,
  });
  const { createEquipment } = useContext(EquipmentContext);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEquipment(formData, router);
      toast.success("Equipment created successfully!");
    } catch (error) {

        const fileValidation = error.user_manual && error.user_manual[0] 
        if (fileValidation) {
          toast.error(error.user_manual[0]);
        } else {

          toast.error(error.message || "Failed to create equipment");
        }
      //   const errorResponse = error.response;
      // console.log(errorResponse);
      //   if (errorResponse) {
      //     // Check if errorResponse has specific field errors, e.g., "user_manual"
      //     Object.keys(errorResponse).forEach((field) => {
      //       const messages = errorResponse[field];
      //       if (Array.isArray(messages)) {
      //         messages.forEach((message) => {
      //           toast.error(`${field}: ${message}`);
      //         });
      //       }
      //     });
      //   } else {
      //     // Fallback to generic error handling
      //     toast.error(error.message || "Failed to create equipment");
      //   }
      }
      
    
  };

  return (
    <div className=" bg-gray-50">

      
    <div className="flex justify-center items-center ">
      
      <Card className="w-full max-w-xl shadow-lg rounded-lg bg-white mt-2">
      {/* <div className=" p-2 border-b bg-gray-100 ">
          <BreadCrumbs />
        </div> */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Equipment</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <Label htmlFor="name">Equipment Name</Label>
              <Input id="name" type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" name="quantity" placeholder="Enter quantity" value={formData.quantity} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="per_day_rate">Per Day Rate</Label>
                <Input id="per_day_rate" type="number" name="per_day_rate" placeholder="Enter rate" value={formData.per_day_rate} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="delivery_charge">Delivery Charge</Label>
                <Input id="delivery_charge" type="number" name="delivery_charge" placeholder="Enter charge" value={formData.delivery_charge} onChange={handleChange} required />
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <Switch id="availability_status" checked={formData.availability_status} onCheckedChange={(checked) => setFormData({ ...formData, availability_status: checked })} />
                <Label htmlFor="availability_status">Available</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="image">Upload Image</Label>
              <Input id="image" type="file" name="image" onChange={handleFileChange} />
            </div>

            <div>
              <Label htmlFor="user_manual">Upload User Manual</Label>
              <Input id="user_manual" type="file" name="user_manual" onChange={handleFileChange} />
            </div>

            <Button type="submit" className="w-full">Create Equipment</Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>

  );
};

export default CreateEquipment;
