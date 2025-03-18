"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { EquipmentContext } from "../../../../utils/equip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";

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
        // if (!user) {
        //     toast.error(`You must be logged in to create a booking.`);
        //     return;
        // }
        
        try {
            await createEquipmentBookings(formData, router);
            toast.success("Booking created successfully!");
        } catch (error) {
            toast.error("Failed to create booking");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <BreadCrumbs />
            <Card className="w-full max-w-lg shadow-lg p-6 bg-white rounded-xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-center">Create Equipment Booking</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Start Date:</Label>
                            <Input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>End Date:</Label>
                            <Input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Delivery Location:</Label>
                            <Input type="text" name="delivery_location" value={formData.delivery_location} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Quantity (Max: {maxQuantity}):</Label>
                            <Input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                                max={maxQuantity}
                                min={1}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Create Booking</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateEquipmentBooking;
