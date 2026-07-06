import { useEffect, useState } from "react";
import { CalendarDays, ClipboardCheck, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import StatusBadge from "../components/admin/StatusBadge";
import AdminLayout from "../components/admin/AdminLayout";
import StatCard from "../components/admin/StatCard";
import { getDashboard } from "../services/adminService";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-gray-500 text-lg">Loading dashboard...</div>
      </AdminLayout>
    );
  }
  const bookingTrend = [
    { day: "Mon", bookings: 4 },
    { day: "Tue", bookings: 8 },
    { day: "Wed", bookings: 6 },
    { day: "Thu", bookings: 10 },
    { day: "Fri", bookings: 7 },
    { day: "Sat", bookings: 9 },
    { day: "Sun", bookings: 5 },
  ];

  const COLORS = ["#2563EB", "#7C3AED", "#EAB308", "#22C55E"];

  return (
    <AdminLayout>
      {/* Heading */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <p className="text-gray-500 mt-1">
          Welcome back. Here's an overview of your laboratory.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-4 gap-5">
        <StatCard
          title="Today's Bookings"
          value={dashboard.cards.todayBookings}
          icon={<CalendarDays size={24} />}
        />

        <StatCard
          title="Pending Reports"
          value={dashboard.cards.pendingReports}
          icon={<FileText size={24} />}
        />

        <StatCard
          title="Completed Tests"
          value={dashboard.cards.completedTests}
          icon={<ClipboardCheck size={24} />}
        />

        <StatCard
          title="Patients"
          value={dashboard.cards.totalPatients}
          icon={<Users size={24} />}
        />
      </div>

      {/* Charts Row */}

      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Booking Trend */}

        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Booking Trend</h2>

              <p className="text-sm text-gray-500 mt-1">
                Weekly appointment overview
              </p>
            </div>
          </div>

          <div className="h-[320px] flex items-center justify-center text-gray-400">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={bookingTrend}>
                <XAxis dataKey="day" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#2563EB"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Chart */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Booking Status</h2>

          <p className="text-sm text-gray-500 mt-1">
            Current booking distribution
          </p>

          {/* Donut chart goes here */}

          <div className="h-[320px] flex items-center justify-center text-gray-400">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={dashboard.statusChart}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {dashboard.statusChart.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-5 space-y-2">
              {dashboard.statusChart.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span>{item.name}</span>

                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      {/* ================= Recent Bookings ================= */}

      <div className="bg-white rounded-xl border border-gray-100 mt-6 overflow-hidden">
        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Bookings
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Latest pathology appointments.
            </p>
          </div>

          <Link
            to="/admin/bookings"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Divider */}

        <div className="border-t border-gray-100"></div>

        {/* Table */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-gray-100 bg-white text-left">
                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Patient
                </th>

                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Tests
                </th>

                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Status
                </th>

                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Date
                </th>

                <th className="px-6 py-3 text-sm font-medium text-gray-500">
                  Time
                </th>

                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* Patient */}

                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-[15px] text-gray-900">
                        {booking.userId?.name}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {booking.userId?.email}
                      </p>
                    </div>
                  </td>

                  {/* Tests */}

                  <td className="px-6 py-4">
                    <p
                      className="max-w-[240px] truncate text-sm text-gray-700"
                      title={booking.tests?.map((t) => t.testName).join(", ")}
                    >
                      {booking.tests?.map((t) => t.testName).join(", ")}
                    </p>
                  </td>

                  {/* Status */}

                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} />
                  </td>

                  {/* Date */}

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(booking.appointmentDate).toLocaleDateString(
                      "en-GB",
                    )}
                  </td>

                  {/* Time */}

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {booking.timeSlot}
                  </td>

                  {/* Action */}

                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/bookings/${booking._id}`}
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      View
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
