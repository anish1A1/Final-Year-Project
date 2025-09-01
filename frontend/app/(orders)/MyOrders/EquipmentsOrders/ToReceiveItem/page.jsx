"use client";
import React, { useEffect, useContext, useState } from "react";
import { EquipmentContext } from "../../../../../utils/equip";
import axios from "@/utils/axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  User,
  DollarSign,
  MapPin,
  Calendar,
  CheckCircle,
  PackageCheck,
} from "lucide-react";
import { toast } from "sonner";
const ToReceiveItem = () => {
  const {
    fetchEquipmentDeliveriesToReceive,
    deliveryReceive,
    fetchEquipment,
    equipment,
    fetchEquipmentBookings,
    equipmentBooks,
    loading,
    updateEquipmentDelivery
  } = useContext(EquipmentContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetchEquipmentDeliveriesToReceive();
      await fetchEquipment();
      await fetchEquipmentBookings();
    };
    fetchData();
  }, []);
  const [selectedStatus, setSelectedStatus] = useState({});

  const getBookingDetails = (bookingId) => {
    const bookingCaught =
      equipmentBooks.find((booking) => booking.id === bookingId) || {};
    const bookedEquipment =
      equipment.find((equip) => equip.id === bookingCaught.equipment) || {};

    return { bookingCaught, equipment: bookedEquipment };
  };

//   const handleStatusChange = (id, status) => {
//     setSelectedStatus((prevState) => ({
//       ...prevState,
//       [id]: status,
//     }));
//   };

  const handleDeliveryReceived = async (id) => {
      try {
        const response = await axios.patch(`/api/equipment-delivery/${id}/`, {
            equipment_received: true
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response) {
          fetchEquipmentDeliveriesToReceive();
          toast.success("Yay!  Your Delivery has been received");
        }
      } catch (error) {
        toast.error(error?.message || 'Failed to Update the Delivery Status');
      }
  }
//   const handleDeliveryStatusSubmit = async (id) => {
//     if (selectedStatus[id]) {
//       try {
//         const updatedDelivery = await updateEquipmentDelivery(id, selectedStatus[id]);
//         if (updatedDelivery) {
//           fetchEquipmentDeliveriesToReceive();
//           toast.success(updatedDelivery.message);
//         }
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   };




  if(loading){
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold mt-24 text-center mb-10 text-primary">
          <Truck className="inline mr-2 text-muted-foreground" />
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">
        <Truck className="inline mr-2 text-muted-foreground" />
        Equipment To Receive
      </h1>

      {deliveryReceive.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No items to receive
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deliveryReceive.map((delivery) => {
            const { bookingCaught, equipment: bookedEquipment } =
              getBookingDetails(delivery.equipment_payment.equipment_booking);

            return (
              <Card key={delivery.id} className="hover:shadow-xl transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PackageCheck className="w-5 h-5 text-green-600" />
                    Delivery ID: {delivery.id}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {delivery.status === "pending" ? (
                      <Badge variant="outline" className="text-yellow-600  border-yellow-600">
                        Pending
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-green-600   border-green-600">
                        {delivery.status}
                      </Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>
                      <strong>User:</strong> {delivery.equipment_payment.user}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>
                      <strong>Amount:</strong> ${delivery.equipment_payment.amount}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>
                      <strong>Location:</strong> {bookingCaught.delivery_location || "N/A"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <strong>Quantity:</strong> {bookingCaught.quantity || "N/A"}
                    </div>
                    <div>
                      <strong>Days:</strong> {bookingCaught.total_date || "N/A"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <Calendar className="inline w-3 h-3 mr-1" />
                      Start: {bookingCaught.start_date || "N/A"}
                    </div>
                    <div>
                      <Calendar className="inline w-3 h-3 mr-1" />
                      End: {bookingCaught.end_date || "N/A"}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <strong>Equipment:</strong> {bookedEquipment.name || "N/A"}
                  </div>
                  <div>
                    <strong>Owner:</strong> {bookedEquipment.user || "N/A"}
                  </div>
                  {delivery.equipment_received === true ? (
                    <>
                    <p className="px-3 py-1.5 mx-20 text-sm font-semibold rounded-full flex items-center  gap-2 bg-green-100 text-green-600">
                                            <CheckCircle className="w-4 h-4" />
                                            You have Received this item</p>
                    <p className="text-xs font-medium text-muted-foreground italic text-end">
                        Please return the item by{" "}
                        {bookingCaught.end_date
                            ? new Date(new Date(bookingCaught.end_date).setDate(new Date(bookingCaught.end_date).getDate() + 1)).toLocaleDateString()
                            : "N/A"}
                        </p>
                  </>
                  ): (
                      <>
                      {delivery.status === "delivered" ? (
                    <Button className="w-full mt-4" variant="default" onClick={() => handleDeliveryReceived(delivery.id)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Received
                    </Button>
                          
                      ): (
                          <p className="w-full mt-4 text-center font-normal p-2 bg-slate-600 rounded-lg text-white flex items-center justify-center">
                      <Calendar className="inline w-3 h-3 mr-1" />
                            
                            Item will be delivered soon..</p>
                      )}
                      </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ToReceiveItem;
