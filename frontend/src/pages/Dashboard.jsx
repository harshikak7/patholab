import React from "react";
import Navbar from "../components/home/Navbar";
import { Calendar, FileText, Activity, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
        {/* WELCOME */}

        <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-10 text-white">
          <h1 className="text-4xl font-bold">Welcome Back 👋</h1>

          <p className="mt-3 text-blue-100">
            Manage your appointments, reports, and health records from one
            place.
          </p>
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3  gap-6 mt-6">
          <StatCard icon={<Calendar />} title="Bookings" value="0" />

          <StatCard icon={<FileText />} title="Reports Ready" value="0" />

          <StatCard icon={<Activity />} title="Completed Tests" value="0" />
        </div>

        {/* TWO COLUMN */}

        <div className="grid lg:grid-cols-2 gap-8 mt-6">
          {/* UPCOMING */}

          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <h2 className="text-xl font-semibold">Upcoming Appointment</h2>

            <div className="mt-6">
              <h3 className="font-semibold text-lg">No Upcoming Booking</h3>

              <p className="text-gray-500 mt-2">
                Book a test to see your appointment details here.
              </p>
            </div>
          </div>

          {/* RECENT BOOKINGS */}

          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Bookings</h2>

              <Link
                to="/my-bookings"
                className="text-blue-600 flex items-center gap-1"
              >
                View All
                <ChevronRight size={16} />
              </Link>
            </div>

            <p className="mt-6 text-gray-500">No bookings yet.</p>
          </div>
        </div>

        {/* QUICK ACTIONS */}

        <div className="bg-white rounded-2xl p-7 shadow-sm mt-8">
          <h2 className="text-xl font-semibold">Quick Actions</h2>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Link
              to="/book-test"
              className="bg-blue-50 hover:bg-blue-100 rounded-2xl p-5 transition"
            >
              <h3 className="font-semibold">Book Test</h3>

              <p className="text-sm text-gray-500 mt-1">
                Schedule a new lab test
              </p>
            </Link>

            <Link
              to="/my-bookings"
              className="bg-blue-50 hover:bg-blue-100 rounded-2xl p-5 transition"
            >
              <h3 className="font-semibold">My Appointments</h3>

              <p className="text-sm text-gray-500 mt-1">View all bookings</p>
            </Link>

            <Link
              to="/reports"
              className="bg-blue-50 hover:bg-blue-100 rounded-2xl p-5 transition"
            >
              <h3 className="font-semibold">Reports</h3>

              <p className="text-sm text-gray-500 mt-1">Access test reports</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="text-blue-600">{icon}</div>

      <h3 className="mt-4 text-gray-500">{title}</h3>

      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default Dashboard;
