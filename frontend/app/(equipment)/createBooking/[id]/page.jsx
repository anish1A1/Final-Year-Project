"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { EquipmentContext } from "../../../../utils/equip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import CustomBreadCrumb from "@/Impcomponent/CustomBreadCrumb";

const CreateEquipmentBooking = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        delivery_location: "",
        quantity: 1,
        equipment: id,
    });
    const [maxQuantity, setMaxQuantity] = useState(0);
    const router = useRouter();
    const { createEquipmentBookings, fetchEquipment, equipment } = useContext(EquipmentContext);

    useEffect(() => {
        const fetchEquipmentDetails = async () => {
            await fetchEquipment();
        };
        fetchEquipmentDetails();
    }, []);

    useEffect(() => {
        if (Array.isArray(equipment) && equipment.length > 0) {
            const equipmentDetails = equipment.find(equip => equip.id === parseInt(id));
            if (equipmentDetails) {
                setMaxQuantity(equipmentDetails.quantity);
            }
        }
    }, [equipment, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

  
        
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await createEquipmentBookings(formData, router);
            toast.success(response.message || "Booking created successfully!");
        } catch (error) {
            // Check if the error response has an "error" array
            const errorMessage = Array.isArray(error.error)
                ? error.error[0] // Extract the first error message from the array
                : "Failed to create booking";
    
            // console.error("Error creating booking:", errorMessage);
            toast.error(errorMessage); // Display the error message in a toast
        }
    };

    const customLinks = [
        { href: '/equipmentList', label: 'Equipment List' },
        { href: `/createBooking/${id}`, label: 'Create Booking' },
    ];
    
    
   
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-8">
  <div className="w-full max-w-lg bg-white shadow-md rounded-2xl overflow-hidden">
    {/* Breadcrumbs */}
    <div className="p-4 border-b bg-gray-100">
        <CustomBreadCrumb items={customLinks} />
    </div>

    {/* Form Card */}
    <div className="p-6">
      {/* Card Header */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Create Equipment Booking
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Start Date */}
        <div>
          <Label className="block text-gray-600 font-medium mb-1">Start Date</Label>
          <Input
            type="date"
            name="start_date"
            value={formData.start_date}
            min={new Date().toISOString().split("T")[0]} // Today's date
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* End Date */}
        <div>
          <Label className="block text-gray-600 font-medium mb-1">End Date</Label>
          <Input
            type="date"
            name="end_date"
            value={formData.end_date}
            min={new Date().toISOString().split("T")[0]} // Today's date
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Delivery Location */}
        <div>
          <Label className="block text-gray-600 font-medium mb-1">Delivery Location</Label>
          <Input
            type="text"
            name="delivery_location"
            value={formData.delivery_location}
            onChange={handleChange}
            required
            placeholder="Enter delivery location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Quantity */}
        <div>
          <Label className="block text-gray-600 font-medium mb-1">
            Quantity (Max: {maxQuantity})
          </Label>
          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            max={maxQuantity}
            min={1}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all"
        >
          Create Booking
        </Button>
      </form>
    </div>
  </div>
</div>

    );
};

export default CreateEquipmentBooking;
