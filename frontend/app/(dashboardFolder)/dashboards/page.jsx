"use client";
import React from "react";
import PrivateRoute from "../../middleware/PrivateRoute";
import EquipmentToBookList from "../../(myEquipments)/MyEquipments/equipmentBookedList/page";
import ManageEquipment from "../../(myEquipments)/MyEquipments/ManageEquipment/page";
import ToReceiveItem from "../../(orders)/MyOrders/EquipmentsOrders/ToReceiveItem/page";
import UserCartDelivery from "../../components/Deliveries/cartDeliveries/UserCartDelivery";
import Link from "next/link";
import { LayoutDashboard, Package, Truck, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


const DashboardPage = () => {
  return (
    <PrivateRoute>
     

          {/* Main Content */}
          <main className="flex-1 p-6 mt-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <Separator className="my-4" />

            {/* Manage Equipment */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Manage Your Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <ManageEquipment />
                <Button asChild className="mt-4">
                  <Link href="/dashboards/dashboardEquipment/ManageEquipment">View More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Booked Equipment */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Equipment Applied for Rent</CardTitle>
              </CardHeader>
              <CardContent>
                <EquipmentToBookList />
                <Button asChild className="mt-4">
                  <Link href="/dashboards/dashboardEquipment/equipmentBookedList">View More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Deliver Items */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Go to Deliver Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/dashboards/dashboardEquipment/todeliverItem">Go to Deliveries</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Receiving Items */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Go to Receiving Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/dashboards/dashboardEquipment/ToReceiveItem">Go to Receiving</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Ordered Products */}
            <Card>
              <CardHeader>
                <CardTitle>Ordered Products</CardTitle>
              </CardHeader>
              <CardContent>
                <UserCartDelivery />
                <Button asChild className="mt-4">
                  <Link href="/dashboards/productOrders">View Orders</Link>
                </Button>
              </CardContent>
            </Card>
          </main>

    </PrivateRoute>
  );
};

export default DashboardPage;
