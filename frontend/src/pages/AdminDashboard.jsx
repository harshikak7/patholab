import { Link } from "react-router-dom";
import { Bell, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import AdminLayout from "../components/admin/AdminLayout";
import { getAllBookings } from "../services/adminService";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        setBookings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <AdminLayout>
      {/* HEADER */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-5xl font-bold">Welcome Back!</h1>

          <p className="text-gray-500 text-lg mt-3">
            Manage bookings, reports, technicians and laboratory operations.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative">
            <Bell size={26} className="text-gray-600" />

            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-500"></div>

            <div>
              <p className="font-semibold">Administrator</p>

              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-4 gap-6 mt-10">
        <StatCard
          title="Bookings"
          value="124"
          subtitle="All Time"
          color="bg-green-100"
        />

        <StatCard
          title="Reports Pending"
          value="18"
          subtitle="Awaiting Upload"
          color="bg-yellow-100"
        />

        <StatCard
          title="Technicians"
          value="12"
          subtitle="Active Staff"
          color="bg-purple-100"
        />

        <StatCard
          title="Patients"
          value="328"
          subtitle="Registered"
          color="bg-orange-100"
        />
      </div>

      {/* RECENT BOOKINGS */}

      <div className="bg-white rounded-3xl mt-10 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-8 py-7">
          <div>
            <h2 className="text-3xl font-bold">Recent Bookings</h2>

            <p className="text-gray-500 mt-1">Latest pathology appointments</p>
          </div>

          <Link to="/admin/bookings" className="text-blue-600 font-medium">
            View All
          </Link>
        </div>

        {/* TABLE HEADER */}

        <div className="grid grid-cols-6 bg-gray-50 px-8 py-5 font-semibold text-gray-600">
          <p>Patient</p>

          <p>Tests</p>

          <p>Status</p>

          <p>Date</p>

          <p>Time</p>

          <p className="text-right">Action</p>
        </div>

        {/* TABLE ROWS */}

        {bookings.slice(0, 5).map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-6 items-center px-8 py-5 border-b last:border-none"
          >
            <div>
              <p className="font-semibold">{booking.userId?.name}</p>

              <p className="text-sm text-gray-500">{booking.userId?.email}</p>
            </div>

            <p className="truncate pr-5">
              {booking.tests?.map((test) => test.testName).join(", ")}
            </p>

            <StatusBadge status={booking.status} />

            <p>{new Date(booking.appointmentDate).toLocaleDateString()}</p>

            <p>{booking.timeSlot}</p>

            <Link
              to={`/admin/bookings/${booking._id}`}
              className="flex justify-end"
            >
              <ChevronRight size={22} className="text-gray-500" />
            </Link>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

const StatCard = ({ title, value, subtitle, color }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-4xl font-bold mt-4">{value}</h2>

          <p className="text-gray-400 text-sm mt-3">{subtitle}</p>
        </div>

        {/* Replace this with your own icon */}

        <div className={`w-14 h-14 rounded-2xl ${color}`} />
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",

    Assigned: "bg-blue-100 text-blue-700",

    Collected: "bg-purple-100 text-purple-700",

    Completed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-2 rounded-full text-sm font-medium w-fit ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default AdminDashboard;
