import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Users,
  Stethoscope,
  FlaskConical,
  Settings,
  Headphones,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} strokeWidth={2} />,
    },
    {
      title: "Bookings",
      path: "/admin/bookings",
      icon: <CalendarDays size={20} strokeWidth={2} />,
    },
    {
      title: "Reports",
      path: "/admin/reports",
      icon: <FileText size={20} strokeWidth={2} />,
    },
    {
      title: "Technicians",
      path: "/admin/technicians",
      icon: <Stethoscope size={20} strokeWidth={2} />,
    },
    {
      title: "Tests",
      path: "/admin/tests",
      icon: <FlaskConical size={20} strokeWidth={2} />,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <Users size={20} strokeWidth={2} />,
    },
  ];

  return (
    <aside className="w-[260px] h-[calc(100vh-80px)] bg-white border-r border-gray-100 flex flex-col px-4 py-6 sticky top-20">

      <nav className="flex flex-col gap-1">

        {menuItems.map((item) => {

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 h-14 px-5 rounded-xl transition-all duration-200
              ${
                active
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.icon}

              <span className="text-[17px]">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-gray-100 pt-6 flex flex-col gap-2">

        <Link
          to="/admin/settings"
          className={`flex items-center gap-4 h-14 px-5 rounded-xl transition-all
          ${
            location.pathname === "/admin/settings"
              ? "bg-blue-100 text-blue-600 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Settings size={20} />

          <span className="text-[17px]">Settings</span>
        </Link>

        <Link
          to="/admin/help"
          className={`flex items-center gap-4 h-14 px-5 rounded-xl transition-all
          ${
            location.pathname === "/admin/help"
              ? "bg-blue-100 text-blue-600 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Headphones size={20} />

          <span className="text-[17px]">Help Centre</span>
        </Link>

      </div>

    </aside>
  );
};

export default AdminSidebar;