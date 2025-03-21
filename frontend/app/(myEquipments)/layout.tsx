import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex  mt-[84px] bg-gray-100">
      {/* Sidebar Navigation */}
      {/* <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <p className="text-sm text-gray-300 mt-2">
            Manage your equipment efficiently
          </p>
        </div>
        <nav className="flex flex-col mt-8 space-y-4">
          <Link
            href="/MyEquipments/"
            className="block px-6 py-3 hover:bg-blue-700 rounded transition"
          >
            Equipments
          </Link>
          <Link
            href="/MyEquipments/ManageEquipment"
            className="block px-6 py-3 hover:bg-blue-700 rounded transition"
          >
            Manage Equipments
          </Link>
          <Link
            href="/MyEquipments/equipmentBookedList"
            className="block px-6 py-3 hover:bg-blue-700 rounded transition"
          >
            Booked Lists
          </Link>
          <Link
            href="/MyEquipments/todeliverItem"
            className="block px-6 py-3 hover:bg-blue-700 rounded transition"
          >
            Manage Deliveries
          </Link>
        </nav>
      </aside> */}

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 bg-white overflow-auto">
        <div className="bg-gray-100 p-4 rounded-md shadow-sm ">
          <div className="flex justify-between items-center">
            
            <Link
            href="/MyEquipments/"
        
          >
            <h1 className="text-2xl font-semibold text-gray-800 cursor-pointer">
            📦My Equipments
            </h1>
          </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/MyEquipments/ManageEquipment"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Manage Equipments
              </Link>
              <Separator orientation="vertical" className="h-5 w-px bg-gray-300" />
              <Link
                href="/MyEquipments/equipmentBookedList"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Booked Lists
              </Link>
              <Separator orientation="vertical" className="h-5 w-px bg-gray-300" />

              <Link
                href="/MyEquipments/createEquipment"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Create Equipment
              </Link>
              <Separator orientation="vertical" className="h-5 w-px bg-gray-300" />

              <Link
                href="/MyEquipments/todeliverItem"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Manage Deliveries
              </Link>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
