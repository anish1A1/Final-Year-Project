"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { EquipmentContext } from "../../../../utils/equip";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const CreateEquipmentPaymentPage = () => {
    const { createEquipmentPayment, equipmentBooks, fetchEquipmentBookings } = useContext(EquipmentContext);
    const [formData, setFormData] = useState({
        payment_method: "",
        amount: 0,
        equipment_booking: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        fetchEquipmentBookings();
    }, []);

    useEffect(() => {
        if (id) {
            const booking = equipmentBooks.find((booking) => booking.id === parseInt(id));
            if (booking) {
                setFormData({
                    equipment_booking: id,
                    amount: booking.total_cost,
                    payment_method: "",
                });
            }
        }
    }, [id, equipmentBooks]);

    const handleChange = (value) => {
        setFormData({ ...formData, payment_method: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            

            const response = await createEquipmentPayment(formData, router, setError);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            router.push("/dashboards");
            // toast.success("Equipment Payment successful!")
            toast.success(response.message);
        } catch (error) {
            toast.error("Payment failed. Try again.");
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Make Payment</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4">
                            {error.non_field_errors?.join(", ") || "An error occurred"}
                        </div>
                    )}
                    <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
                        <h3 className="text-lg font-semibold">Invoice</h3>
                        <p className="text-sm text-gray-600">Booking ID: {formData.equipment_booking}</p>
                        <p className="text-xl font-bold">Amount: NPR {formData.amount}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                            <Select onValueChange={handleChange} value={formData.payment_method}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select Payment Method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="esewa">eSewa</SelectItem>
                                    <SelectItem value="khalti">Khalti</SelectItem>
                                    <SelectItem value="cash">Cash</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            type="submit"
                            className="w-full mt-3"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Pay Now"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateEquipmentPaymentPage;
