import MyOrderSidebar from "@/ImpComponent/MyOrderSidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className=" flex ">
        {/* Sidebar Navigation */}
        

        {/* Main Dashboard Content */}
            <main className="flex-1 mt-[90px] ml-2 p-2 min-h-screen">
             <MyOrderSidebar />
              {children}
              </main>
          </div>
    </div>
  );
};

export default DashboardLayout;
