"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EquipmentContext } from "../../../utils/equip";
import { AuthContext } from "../../../utils/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";

const EquipmentList = () => {
  const { fetchEquipment, equipment, deleteEquipment, fetchEquipmentBookings, equipmentBooks } = useContext(EquipmentContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    fetchEquipment();
    fetchEquipmentBookings();
  }, []);

  useEffect(() => {
    if (Array.isArray(equipmentBooks) && equipmentBooks.length > 0 && user) {
      const bookings = equipmentBooks.filter((booking) => booking.user === user.username);
      setUserBookings(bookings);
    }
  }, [equipmentBooks, user]);

  const handleDelete = async (id) => {
    await deleteEquipment(id);
    toast.success("Equipment deleted successfully!");
  };

  const handleUpdate = (id) => {
    router.push(`/updateEquipment/${id}`);
  };

  const handleCreateBooking = (id) => {
    if (!user) {
        toast.error("You need to be logged in to create a booking.");
        return;
    }
    router.push(`/createBooking/${id}`);
  };

  const isAlreadyBooked = (equipmentId) => {
    return userBookings.some((booking) => booking.equipment === equipmentId);
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-20">
      <div className="max-w-6xl mx-3 mb-4">
        <BreadCrumbs />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Equipment List</h1>
        {user ? (
          <Link href="/createEquipment">
            <Button>Create Equipment</Button>
          </Link>
        ) : null}
      </div>
      <Separator className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <Card key={item.id} className="shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-lg w-full h-40 object-cover mb-4 hover:scale-105 transition-transform"
                  />
                )}
                <p className="text-gray-600 text-center mb-2">{item.description}</p>
                <Badge className="mb-2">Per Day Rate: ${item.per_day_rate}</Badge>
                <Badge variant="outline">Delivery Charge: ${item.delivery_charge}</Badge>
                <p className="text-gray-700 mt-2"><strong>Owner:</strong> {item.user}</p>
                <p className="text-gray-700"><strong>Status:</strong> {item.availability_status ? "Available" : "Not Available"}</p>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-col gap-2">
                <Link href={`/equipmentList/${item.id}`}>
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
                {user && item.user === user.username && (
                  <>
                    <Button variant="secondary" className="w-full" onClick={() => handleUpdate(item.id)}>Update</Button>
                    <Button variant="destructive" className="w-full" onClick={() => handleDelete(item.id)}>Delete</Button>
                  </>
                )}
                {user && item.user !== user.username && (
                  isAlreadyBooked(item.id) ? (
                    <Button variant="outline" className="w-full" disabled>Already Booked</Button>
                  ) : (
                    <Button className="w-full" onClick={() => handleCreateBooking(item.id)}>Create Booking</Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EquipmentList;
