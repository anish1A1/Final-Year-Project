"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EquipmentContext } from "../../../utils/equip";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

const UpdateEquipmentForm = ({ id, initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData);
    const { updateEquipment } = useContext(EquipmentContext);
    const router = useRouter();

    useEffect(() => {
        if (initialFormData) {
            setFormData(initialFormData);
        }
    }, [initialFormData]);

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
            await updateEquipment(id, formData, router);
        } catch (error) {
            console.error("Error: while updating equipment", error);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center min-h-screen"
        >
            <Card className="w-full max-w-lg p-6 shadow-lg rounded-lg">
                <CardHeader className="text-xl font-bold text-center">Update Equipment</CardHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea name="description" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Image</Label>
                            <Input type="file" name="image" onChange={handleFileChange} className="cursor-pointer" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="availability" name="availability_status" checked={formData.availability_status} onChange={handleChange} />
                            <Label htmlFor="availability">Availability Status</Label>
                        </div>
                        <div>
                            <Label>Quantity</Label>
                            <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Per Day Rate</Label>
                            <Input type="number" step="0.01" name="per_day_rate" value={formData.per_day_rate} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>User Manual</Label>
                            <Input type="file" name="user_manual" onChange={handleFileChange} className="cursor-pointer" />
                        </div>
                        <div>
                            <Label>Delivery Charge</Label>
                            <Input type="number" step="0.01" name="delivery_charge" value={formData.delivery_charge} onChange={handleChange} required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button type="submit" className="w-full flex items-center justify-center gap-2">
                            <Upload size={18} /> Update Equipment
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    );
};

export default UpdateEquipmentForm;
