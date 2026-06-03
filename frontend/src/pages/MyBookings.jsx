import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import { Calendar, Clock3 } from "lucide-react";
import { getMyBookings } from "../services/bookingService";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
    const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
        {/* HEADER */}

        <div>
          <h1 className="text-5xl font-bold">My Bookings</h1>

          <p className="text-gray-500 mt-3">
            Track all your lab appointments and booking history.
          </p>
        </div>

        {/* EMPTY STATE */}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 mt-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">No Bookings Yet</h2>

            <p className="text-gray-500 mt-3">
              Your booked tests will appear here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* STATUS */}

                <div className="flex justify-between items-start">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      booking.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "Assigned"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* TEST NAME */}

                <h2 className="text-xl font-bold mt-5 leading-snug">
                  {booking.tests?.map((test) => test.testName).join(", ")}
                </h2>

                {/* DATE & TIME */}

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={18} />

                    {new Date(booking.appointmentDate).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock3 size={18} />

                    {booking.timeSlot}
                  </div>
                </div>

                {/* FOOTER */}

                <div className="mt-6 pt-5 border-t flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {booking.tests?.length} Test
                    {booking.tests?.length > 1 ? "s" : ""}
                  </span>

                  <button
  onClick={() =>
    navigate(
      `/booking-details/${booking._id}`
    )
  }
  className="text-blue-600 font-medium hover:text-blue-700"
>
  View Details
</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
