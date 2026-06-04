import React from "react";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Users,
  Stethoscope,
  FlaskConical,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FC] flex">
      {/* SIDEBAR */}

      <aside className="w-72 bg-white border-r border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-blue-600">PathoLab</h1>

        <p className="text-sm text-gray-500 mt-1">Admin Panel</p>

        <nav className="mt-10 space-y-3">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
          >
            <CalendarDays size={20} />
            Bookings
          </Link>

          <Link
            to="/admin/reports"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
          >
            <FileText size={20} />
            Reports
          </Link>

          <Link
            to="/admin/technicians"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
          >
            <Stethoscope size={20} />
            Technicians
          </Link>

          <Link
            to="/admin/tests"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
          >
            <FlaskConical size={20} />
            Tests
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
          >
            <Users size={20} />
            Users
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Manage bookings, reports, technicians and tests.
        </p>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-gray-500">Total Bookings</p>

            <h2 className="text-4xl font-bold mt-3">0</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-gray-500">Pending Reports</p>

            <h2 className="text-4xl font-bold mt-3">0</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-gray-500">Technicians</p>

            <h2 className="text-4xl font-bold mt-3">0</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-gray-500">Users</p>

            <h2 className="text-4xl font-bold mt-3">0</h2>
          </div>
        </div>

        {/* RECENT BOOKINGS */}

        <div className="bg-white rounded-3xl p-8 shadow-sm mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Bookings</h2>

            <Link to="/admin/bookings" className="text-blue-600">
              View All
            </Link>
          </div>

          <div className="mt-6">
            <p className="text-gray-500">Booking data will appear here.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
