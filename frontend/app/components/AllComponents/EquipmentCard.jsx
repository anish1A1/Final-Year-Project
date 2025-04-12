// components/EquipmentCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function EquipmentCard({ equipment, user, isBooked, onCreateBooking }) {
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
      <div className="relative h-56 w-full">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="rounded-lg w-full h-60 object-cover mb-4 hover:scale-105 transition-transform"
        />
        <Badge
          className={`absolute top-2 right-2 ${
            equipment.availability_status ? "bg-emerald-500" : "bg-amber-500"
          }`}
        >
          {equipment.availability_status ? "Available" : "Not Available"}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{equipment.name}</CardTitle>
        <p className="text-muted-foreground text-sm">{equipment.user}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xl font-bold">${equipment.per_day_rate}/day</p>
            <p className="text-sm text-muted-foreground">
              Delivery: ${equipment.delivery_charge}
            </p>
          </div>
          <Badge variant="outline">{equipment.condition || "Good"}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {equipment.description.split(" ").slice(0,18).join(" ")}
          {equipment.description.split(" ").length > 18 && " ..."}
        </p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex flex-col gap-2">
        <Link href={`/equipmentList/${equipment.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        {user && equipment.user !== user.username && (
          isBooked ? (
            <Button variant="outline" className="w-full" disabled>
              Already Booked
            </Button>
          ) : (
            <Button className="w-full" onClick={() => onCreateBooking(equipment.id)}>
              Create Booking
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
}

export default EquipmentCard;
