"use client";
import React, { useState, useEffect, useContext } from "react";
import { EquipmentContext } from "../../../../../utils/equip";
import { AuthContext } from "../../../../../utils/auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ShoppingCart, CheckCircle, XCircle } from "lucide-react";

const EquipmentToBookList = () => {
  const {
    fetchEquipmentBookings,
    equipmentBooks,
    fetchEquipmentPayment,
    equipmentPurchases,
    loading,
    fetchEquipment,
    equipment,
  } = useContext(EquipmentContext);
  const { user } = useContext(AuthContext);
  const [combinedBookings, setCombinedBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      await fetchEquipmentBookings();
      await fetchEquipment();
      await fetchEquipmentPayment();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      Array.isArray(equipmentBooks) &&
      equipmentBooks.length > 0 &&
      Array.isArray(equipment) &&
      equipment.length > 0 &&
      user
    ) {
      const userBookings = equipmentBooks.filter(
        (booking) => booking.user === user.username
      );
      const combined = userBookings
        .map((booking) => {
          const equipmentDetails = equipment.find(
            (equip) => equip.id === booking.equipment
          );
          return {
            ...booking,
            equipmentDetails: equipmentDetails,
          };
        })
        .filter(
          (item) => item.equipmentDetails && item.equipmentDetails.user !== user.username
        );
      setCombinedBookings(combined);
    }
  }, [equipmentBooks, equipment, user]);

  const hasMadePayment = (bookingId) => {
    return equipmentPurchases.some((payment) => payment.equipment_booking === bookingId);
  };

  const handleStatusAccept = (id) => {
    router.push(`/createEquipmentPayment/${id}`);
  };

  return (
    <div className="container mx-auto mt-28 ml-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Equipments Requested to Rent
      </h2>
      {loading ? (
        <Skeleton className="h-40 w-full rounded-lg" />
      ) : combinedBookings.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-500">
          No equipment bookings available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combinedBookings.map((item) => (
            <Card key={item.id} className="shadow-lg">
              <img
                src={item.equipmentDetails?.image}
                alt={item.equipmentDetails?.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{item.equipmentDetails?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Total Days: {item.total_date}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Equipment Owner: {item.equipmentDetails.user.charAt(0).toUpperCase() + item.equipmentDetails.user.slice(1)}</p>
                <p className="text-gray-600 ">Per Day Rate: Rs.<span className="ml-0.5">{item.equipmentDetails.per_day_rate}</span></p>
                <p className="text-gray-600 font-bold">Total Price: Rs. <span className="ml0.5">{item.total_cost}</span></p>


                <p
                  className={`font-bold mt-2 ${
                    item.status === "accepted" ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  Status: {item.status}
                </p>
                {item.status === "accepted" && !hasMadePayment(item.id) && (
                  <Button
                    onClick={() => handleStatusAccept(item.id)}
                    className="mt-4 w-full"
                  >
                    <ShoppingCart className="mr-2" /> Make Payment
                  </Button>
                )}
                {item.status === "accepted" && hasMadePayment(item.id) && (
                  <p className="mt-4 text-center text-green-500 font-semibold">
                    Payment Completed
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EquipmentToBookList;


