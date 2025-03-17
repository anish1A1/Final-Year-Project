"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Package, Truck, ShoppingCart } from "lucide-react";
import Link from "next/link";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className=" flex min-h-screen  bg-gray-100">
        {/* Sidebar Navigation */}
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboards">
                        <LayoutDashboard className="mr-2" /> Dashboard
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboards/dashboardEquipment/ManageEquipment">
                        <Package className="mr-2" /> Manage Equipment
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboards/dashboardEquipment/equipmentBookedList">
                        <ShoppingCart className="mr-2" /> Booked Equipment
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboards/dashboardEquipment/todeliverItem">
                        <Truck className="mr-2" /> Deliveries
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboards/dashboardEquipment/ToReceiveItem">
                        <Package className="mr-2" /> Receiving Equipments
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Dashboard Content */}
            <main className="flex-1 p-6">
              <SidebarTrigger />
              {children}
              </main>
          </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
