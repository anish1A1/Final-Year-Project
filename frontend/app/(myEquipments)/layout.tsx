
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className=" flex ">
        {/* Sidebar Navigation */}
        

        {/* Main Dashboard Content */}
            <main className="flex-1 mt-[90px] ml-2 p-2 bg-slate-100 min-h-screen">
              {children}
              </main>
          </div>
    </div>
  );
};

export default DashboardLayout;
