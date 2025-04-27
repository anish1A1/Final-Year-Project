"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";
import { EquipmentContext } from "../../../utils/equip";
import {Switch} from "@/components/ui/switch";
import { Label } from "@/components/ui/label"

const OwnersEquipment = () => {
    const {fetchEquipmentByOwners, equipmentOwner, partialUpdateOwnersEquipment, deleteEquipment, loading} = useContext(EquipmentContext);
    
     useEffect(() => {
        fetchEquipmentByOwners();
      }, []);
      const router = useRouter();


  const handleDelete = async (id) => {
    await deleteEquipment(id);
    toast.success("Equipment deleted successfully!");
  };

  const handleUpdate = (id) => {
    router.push(`/updateEquipment/${id}`);
  };

  const handleEquipmentView = (id) => {
    router.push(`/equipmentList/${id}`);
  }

  const handleAvailabilityChange= async (id, status) => {
    try {
      const response = await partialUpdateOwnersEquipment(id, {
        availability_status : status
      })
      toast.success("Equipment availability updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  if(loading){
    return <div className="flex justify-center items-center mt-24 text-2xl font-semibold text-gray-700">Loading...</div>
  }

  if (!equipmentOwner || equipmentOwner.length === 0) {
    return <div className="container mx-full mt-36 mb-48 text-2xl font-semibold text-gray-700">No products created by you</div>;
  };


  return (
    <div className="container mx-auto px-6 ">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        { equipmentOwner && equipmentOwner.length > 0 ? (
            equipmentOwner.map((equipment) => (
              <Card key={equipment.id} 
          className="bg-white shadow-lg rounded-xl pb-5 px-5 transition-all transform  hover:shadow-2xl border border-gray-200">
              
              <CardHeader >
                <CardTitle className="text-lg text-center font-bold">{equipment.name}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                <div className="flex flex-col items-center">
                {equipment.image && (
                  <img
                    src={equipment.image}
                    alt={equipment.name}
                    className="rounded-lg cursor-pointer w-full h-40 object-cover mb-4 hover:scale-105 transition-transform"
                  onClick={() => handleEquipmentView(equipment.id)}
                  />
                )}
                <Badge className="mb-3">Per Day Rate: ${equipment.per_day_rate}</Badge>
                <Badge variant="outline">Delivery Charge: ${equipment.delivery_charge}</Badge>
                              
                </div>

                  
                               
              <div className="flex items-center space-x-2">
                    <Label htmlFor="airplane-mode">Availability: {equipment.availability_status ? "Yes" : "No"}</Label>

                <Switch id="airplane-mode"
                checked={equipment.availability_status}
                onCheckedChange={(newValue) => handleAvailabilityChange(equipment.id, newValue)}
      />
             </div>
                 

                  <p className="text-gray-600 text-center mb-2">
                  {equipment.description.split(" ").slice(0,12).join(" ")}
                  {equipment.description.split(" ").length > 12 && " ..."}
                  </p>
                </div>
              </CardContent>
                <div className="flex flex-col gap-2">
                   <Button variant="secondary" className="w-full" onClick={() => handleUpdate(equipment.id)}>Update</Button>
                  <Button variant="destructive" className="w-full" onClick={() => handleDelete(equipment.id)}>Delete</Button>
                               
                </div>
             </Card>
        ))
      ) : (
        <p className="text-lg font-bold text-center m-32  ml-44 text-gray-800 ">
          No equipment found.
        </p>
      )}

       
      </div>
    </div>
  )
}

export default OwnersEquipment
