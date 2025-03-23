import Link from "next/link";
const ProductDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen pt-24 bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-[220px] bg-blue-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold">Prdoduct Dashboard</h2>
          <p className="text-sm text-gray-100 mt-2">
            Manage your products efficiently
          </p>
        </div>
        
        <nav className="flex flex-col mt-8 space-y-3">
          <Link
            href="/MyProducts/"
            className="block px-6 py-3 hover:bg-blue-700 rounded transition"
          >
            Products
          </Link>
          <Link
            href="/MyProducts/productDelivery/"
            className="block px-6 py-3 hover:bg-blue-700 rounded transition"
          >
            Deliver Products
          </Link>
          <Link
            href="/MyProducts/MyTrades/tradeProductList"

            className="block px-6 py-3 hover:bg-blue-700 rounded transition"
          >
            My Trades
          </Link>
          <Link
            href="/MyProducts//MyTrades/requestedTrades/"
            className="block px-6 py-3 hover:bg-blue-700 rounded transition"
          >
            Requested Trades
          </Link>

          <Link
            href="/MyProducts//MyTrades/tradeOwnerRequests"
            className="block px-6 py-3 hover:bg-blue-700 rounded transition"
          >
            Trade Requests
          </Link>

          <Link
            href="/MyProducts//MyTrades/ToDeliverTrade"
            className="block px-6 py-3 hover:bg-blue-700 rounded transition"
          >
            Trade Deliveries
          </Link>
        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {/* <div className="bg-gray-100 p-4 rounded-md shadow-sm mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              My Equipments
            </h1>
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
                href="/MyEquipments/todeliverItem"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Manage Deliveries
              </Link>
            </div>
          </div>
        </div> */}
        {children}
      </main>
    </div>
  );
};

export default ProductDashboardLayout;
