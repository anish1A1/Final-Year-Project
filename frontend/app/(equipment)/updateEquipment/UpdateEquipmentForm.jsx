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
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";
import { toast } from "sonner";

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
            const fileImageError = error && error.image || error.user_manual
            if (fileImageError) {
                toast.error(fileImageError);
                return;
            }
            toast.error("Error: while updating equipment", error);
        }
    };

    return (
    <div className="max-w-xl mx-auto space-y-1 ">
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center pt-2"
        >
            <Card className="w-full max-w-lg p-6 shadow-lg rounded-lg">
                 <BreadCrumbs />
                <CardHeader className="text-xl font-bold text-center">Update Equipment</CardHeader>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <CardContent className="space-y-3">
                        <div>
                            <Label>Name</Label>
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea name="description" value={formData.description}
                             onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Image</Label>
                            <Input type="file" name="image" onChange={handleFileChange} className="cursor-pointer" />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-3">
                        <div className="flex items-center  ">
                            
                            <Label htmlFor="availability">Availability Status</Label>
                            <Switch id="availability" name="availability_status" 
                            checked={formData.availability_status}
                             onChange={handleChange} />
                        </div>
                            <div className="flex items-center">

                            <Label className="ml-2">Quantity</Label>
                            <Input type="number" name="quantity"
                            className="ml-2"
                            value={formData.quantity} onChange={handleChange} required />
                       
                            </div>
                        </div>
                        <div className="flex items-center justify-between">

                        <div>
                            <Label>Per Day Rate</Label>
                            <Input type="number" step="0.01" name="per_day_rate" value={formData.per_day_rate} onChange={handleChange} required />
                        </div>

                        <div>
                            <Label>Delivery Charge</Label>
                            <Input type="number" step="0.01" name="delivery_charge" value={formData.delivery_charge} onChange={handleChange} required />
                        </div>
                        </div>
                        <div>
                            <Label>User Manual</Label>
                            <Input type="file" name="user_manual" onChange={handleFileChange} className="cursor-pointer" />
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
</div>

    );
};

export default UpdateEquipmentForm;
