import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F7F8FC] flex">
      <AdminSidebar />

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
};

export default AdminLayout;
