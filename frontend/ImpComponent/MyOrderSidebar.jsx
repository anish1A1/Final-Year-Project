"use client";

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/utils/auth';
import { cn } from "@/lib/utils"; // Utility to conditionally join classes
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {PanelRightOpen } from "lucide-react"


  
const MyOrderSidebar = () => {
        const { user } = useContext(AuthContext);
    
    const [isFarmer, setIsFarmer] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user && user.user_roles) {
            
            const farmerRole = user.user_roles.some((role) => role.role.name === 'farmer');
           
            setIsFarmer(farmerRole);
            console.log(user);
        }
        if (user && user.user_roles) {
            
            const adminRole = user.user_roles.some((role) => role.role.name === 'admin');
           
            setIsAdmin(adminRole);
        }
    }, [user]);

  return (
    <Sheet>
      <SheetTrigger asChild >
      <Button
        variant="secondary"
        className="mt-2 bg-slate-700  text-gray-700 font-semibold pt-2 px-4 rounded-lg shadow-md hover:bg-slate-800 hover:shadow-lg transition duration-300"
        >
            <PanelRightOpen />
        Open Sidebar
        </Button>

      </SheetTrigger>

      <SheetContent side="left" className="w-64 bg-gray-900 text-white">
        
        <SheetHeader>
          <SheetTitle className="text-gray-200 text-lg font-bold">My Orders</SheetTitle>
          <SheetDescription className="text-sm text-gray-300">
            Manage all your orders easily.
          </SheetDescription>
        </SheetHeader>

        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <Link
                href="/MyOrders/ProductsOrders/productOrders"
                className="block py-2 px-4 rounded hover:bg-gray-700 transition"
              >
                Products Order
              </Link>
            </li>
            <li>
              <Link
                href="/MyOrders/EquipmentsOrders/ToReceiveItem" 
                className="block py-2 px-4 rounded hover:bg-gray-700 transition"
              >
                Equipment Orders
              </Link>
            </li>
            {/* <li>
              <a
                href="/my-orders/track-orders"
                className="block py-2 px-4 rounded hover:bg-gray-700 transition"
              >
                Track Orders
              </a>
            </li> */}

            {user && isFarmer ? (
                <li>
                <Link
                  href="/MyOrders/TradeOrders/ReceivingTrades/"
                  className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  Receiving Trades
                </Link>
              </li>
            ): null}
            
          </ul>
        </nav>
      </SheetContent>

    </Sheet>
  );
}
export default MyOrderSidebar;