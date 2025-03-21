import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className=" flex ">
        {/* Sidebar Navigation */}
        

        {/* Main Dashboard Content */}
            <main className="flex-1 mt-[90px] ml-2 p-2 bg-slate-100 min-h-screen">
                <div className="flex justify-between items-center space-x-5">
                    <div className="">
                    <Link href='/MyEquipments/'>
                        Equipments
                        </Link>
                    </div>
                    <div className="flex items-center justify-around space-x-2">
                        <Link href='/MyEquipments/ManageEquipment'>
                        Manage Equipments
                        </Link>
                    <Separator />
                        <Link href='/MyEquipments/equipmentBookedList'>
                        Booked Lists
                        </Link>

                        <Link href='/MyEquipments/todeliverItem'>
                        Manage Deliveries
                        </Link>
                    </div>
                </div>
              {children}
              </main>
          </div>
    </div>
  );
};

export default DashboardLayout;
