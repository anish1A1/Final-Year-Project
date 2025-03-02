"use client";
import React, {useState, useEffect, useContext} from 'react'

import { CartContext } from '../../../../utils/cart';
import { AuthContext } from '../../../../utils/auth';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { Switch } from "@/components/ui/switch";
  import { Package, MapPin, RotateCcw, CheckCircle , DollarSign, User} from "lucide-react";
  import { toast } from "sonner";

  const statusColors = {
    pending: "bg-yellow-500",
    owner_to_admin: "bg-gray-500",
    admin_received: "bg-blue-500",
    delivering_to_user: "bg-blue-500",
    delivered: "bg-green-500",
    canceled: "bg-red-500",
  };  
const AdminDashboard = () => {
    const {fetchCartDeliveries, cartDeliveries, loading} = useContext(CartContext);
    const {user} = useContext(AuthContext);

   useEffect(() => {
        fetchCartDeliveries();
      }, [user]);

  return (
    <div>
      
    </div>
  )
}

export default page
