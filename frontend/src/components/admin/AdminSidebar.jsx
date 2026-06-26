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

import logo from "../../assets/logo.svg";

import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />, // Replace with Dashboard Icon
    },
    {
      title: "Bookings",
      path: "/admin/bookings",
      icon: <CalendarDays size={20} />, // Replace
    },
    {
      title: "Reports",
      path: "/admin/reports",
      icon: <FileText size={20} />, // Replace
    },
    {
      title: "Technicians",
      path: "/admin/technicians",
      icon: <Stethoscope size={20} />, // Replace
    },
    {
      title: "Tests",
      path: "/admin/tests",
      icon: <FlaskConical size={20} />, // Replace
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <Users size={20} />, // Replace
    },
  ];

  return (
    <aside className="w-[280px] min-h-screen bg-white border-r border-gray-200 flex flex-col px-5 py-7">
      {/* Logo */}

      <div>
        {/* Replace with Logo Image */}

        <img src={logo} alt="PathoLab" className="w-36" />
      </div>

      {/* Navigation */}

      <nav className="mt-10 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-4 px-5 py-2 rounded-xl transition-all duration-200

            ${
              location.pathname === link.path
                ? "bg-gray-100 text-black font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }
          `}
          >
            {link.icon}

            <span className="text-lg">{link.title}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom */}

      <div className="mt-auto space-y-0">
        <Link
          to="/admin/settings"
          className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-gray-50 text-gray-600"
        >
          <Settings size={20} />

          <span className="text-lg">Settings</span>
        </Link>

        <Link
          to="/admin/help"
          className="flex items-center gap-4 px-5 py-2 rounded-xl hover:bg-gray-50 text-gray-600"
        >
          <Headphones size={20} />

          <span className="text-lg">Help Centre</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
