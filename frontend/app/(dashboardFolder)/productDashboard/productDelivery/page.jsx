"use client"
import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../../../utils/cart'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, PackageCheck, Clock } from "lucide-react";
const ProductDelivery = () => {
    const { deliveryProductOwner, fetchDeliveryProductOwner } = useContext(CartContext);



    useEffect(() =>{
        fetchDeliveryProductOwner();

    }, []);



  return (
    <div>
      {deliveryProductOwner && deliveryProductOwner.map((item, index) => (
        <div key={`${item.id} + ${index}`}>
          <p>{item.delivery_location}</p>
          <p>{item.cart_payment.id}</p>
          <p>{item.cart_payment.user}</p>
        </div>
      ))}
    </div>

   
);
};


export default ProductDelivery

