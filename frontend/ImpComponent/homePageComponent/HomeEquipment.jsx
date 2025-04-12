"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EquipmentContext } from "@/utils/equip";
import { AuthContext } from "../../utils/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import EquipmentCard from "../../app/components/AllComponents/EquipmentCard";


const HomePageEquipmentList = () => {
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
      <Separator className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.slice(0, 3).map((item) => (

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

export default HomePageEquipmentList;
