import React from "react";
import Navbar from "../components/home/Navbar";
import { Calendar, FileText, Activity, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getMyBookings } from "../services/bookingService";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, []);

  const totalBookings = bookings.length;
  const completedTests = bookings.filter(
    (booking) => booking.status === "completed",
  ).length;
  const reportsReady = completedTests; // Assuming each completed test has a report ready

  const upcomingBooking = bookings.find(
    (booking) => booking.status !== "Completed",
  );
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
          <StatCard
            icon={<Calendar />}
            title="Bookings"
            value={totalBookings}
          />

          <StatCard
            icon={<FileText />}
            title="Reports Ready"
            value={reportsReady}
          />

          <StatCard
            icon={<Activity />}
            title="Completed Tests"
            value={completedTests}
          />
        </div>

        {/* TWO COLUMN */}

        <div className="grid lg:grid-cols-2 gap-8 mt-6">
          {/* UPCOMING */}

          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <h2 className="text-xl font-semibold">Upcoming Appointment</h2>

            <div className="mt-6">
              {upcomingBooking ? (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {upcomingBooking.tests
                          ?.map((test) => test.testName)
                          .join(", ")}
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Home Sample Collection
                      </p>
                    </div>

                    <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                      {upcomingBooking.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 mt-6">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-blue-600" />

                      <span>
                        {new Date(
                          upcomingBooking.appointmentDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Activity size={18} className="text-blue-600" />

                      <span>{upcomingBooking.timeSlot}</span>
                    </div>
                  </div>

                  <Link
                    to={`/booking-details/${upcomingBooking._id}`}
                    className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
                  >
                    View Booking
                    <ChevronRight size={18} />
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-lg">No Upcoming Booking</h3>

                  <p className="text-gray-500 mt-2">
                    Book a test to see your appointment details here.
                  </p>
                </>
              )}
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

            <div className="space-y-4 mt-6">
              {bookings.length > 0 ? (
                bookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking._id}
                    className="border-b border-gray-100 pb-4"
                  >
                    <p className="font-medium">
                      {booking.tests?.map((test) => test.testName).join(", ")}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500">
                        {new Date(booking.appointmentDate).toLocaleDateString()}
                      </p>

                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No bookings yet.</p>
              )}
            </div>
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
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Book Test</h3>

                <ChevronRight size={18} className="text-blue-600" />
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Schedule a new lab test
              </p>
            </Link>

            <Link
              to="/my-bookings"
              className="bg-blue-50 hover:bg-blue-100 rounded-2xl p-5 transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">My Appointments</h3>

                <ChevronRight size={18} className="text-blue-600" />
              </div>

              <p className="text-sm text-gray-500 mt-1">View all bookings</p>
            </Link>

            <Link
              to="/reports"
              className="bg-blue-50 hover:bg-blue-100 rounded-2xl p-5 transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Reports</h3>

                <ChevronRight size={18} className="text-blue-600" />
              </div>

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
    <div className="bg-white rounded-[24px] p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>

        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
