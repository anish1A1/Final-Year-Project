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
import EquipmentCard from "../../components/AllComponents/EquipmentCard";

const EquipmentList = () => {
  const { fetchEquipment, equipment, deleteEquipment, fetchEquipmentBookings, equipmentBooks } = useContext(EquipmentContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    fetchEquipment();
    if (user) {
      
      fetchEquipmentBookings();
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (Array.isArray(equipmentBooks) && equipmentBooks.length > 0 && user) {
        const bookings = equipmentBooks.filter((booking) => booking.user === user.username);
        setUserBookings(bookings);
      }
    }
  }, [equipmentBooks, user]);


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
    <div className="container mx-auto px-4 pt-12  mt-[52px]">
      <div className="max-w-6xl mx-3 mb-4">
        <BreadCrumbs />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Equipment List</h1>
        
      </div>
      <Separator className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          
          <EquipmentCard
          key={item.id}
          equipment={item}
          user={user}
          isBooked={user && isAlreadyBooked(item.id)}
          onCreateBooking={handleCreateBooking}
        />

        ))}
      </div>
    </div>
  );
};

export default EquipmentList;