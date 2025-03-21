"use client";
import React, { useEffect, useContext } from "react";
import { EquipmentContext } from "../../../../../utils/equip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ToReceiveItem = () => {
    const {
        fetchEquipmentDeliveriesToReceive,
        deliveryReceive,
        fetchEquipment,
        equipment,
        fetchEquipmentBookings,
        equipmentBooks,
    } = useContext(EquipmentContext);

    useEffect(() => {
        const fetchData = async () => {
            await fetchEquipmentDeliveriesToReceive();
            await fetchEquipment();
            await fetchEquipmentBookings();
        };
        fetchData();
    }, []);

    const getBookingDetails = (bookingId) => {
        const bookingCaught = equipmentBooks.find((booking) => booking.id === bookingId) || {};
        const bookedEquipment = equipment.find((equip) => equip.id === bookingCaught.equipment) || {};

        return { bookingCaught, equipment: bookedEquipment };
    };

    return (
        <div className="container mx-auto p-6 mt-20">
            <h1 className="text-3xl font-bold mb-8 text-center">To Receive</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {deliveryReceive.length === 0 ? (
                    <p className="text-center text-gray-500">No items to receive</p>
                ) : (
                    deliveryReceive.map((delivery) => {
                        const { bookingCaught, equipment: bookedEquipment } = getBookingDetails(
                            delivery.equipment_payment.equipment_booking
                        );

                        return (
                            <Card key={delivery.id} className="shadow-lg rounded-lg">
                                <CardHeader>
                                    <CardTitle>Delivery ID: {delivery.id}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p><strong>Status:</strong> {delivery.status}</p>
                                    <p><strong>User for Delivery:</strong> {delivery.equipment_payment.user}</p>
                                    <p><strong>Total Amount:</strong> ${delivery.equipment_payment.amount}</p>
                                    <Separator />
                                    <p><strong>Location:</strong> {bookingCaught.delivery_location || "N/A"}</p>
                                    <p><strong>Quantity:</strong> {bookingCaught.quantity || "N/A"}</p>
                                    <p><strong>Total Date:</strong> {bookingCaught.total_date || "N/A"}</p>
                                    <p><strong>Start Date:</strong> {bookingCaught.start_date || "N/A"}</p>
                                    <p><strong>End Date:</strong> {bookingCaught.end_date || "N/A"}</p>
                                    <Separator />
                                    <p><strong>Equipment Name:</strong> {bookedEquipment.name || "N/A"}</p>
                                    <p><strong>Equipment Owner:</strong> {bookedEquipment.user || "N/A"}</p>
                                    <Button className="w-full mt-4">Mark as Received</Button>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ToReceiveItem;
