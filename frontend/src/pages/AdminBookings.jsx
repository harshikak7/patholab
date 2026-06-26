import React, { useEffect, useState } from "react";
import { getAllBookings } from "../services/adminService";
import AdminLayout from "../components/admin/AdminLayout";

const AdminBookings = () => {
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
      <h1 className="text-4xl font-bold">Manage Bookings</h1>

      <p className="text-gray-500 mt-2">View and manage all appointments.</p>

      <div className="mt-8 grid gap-5">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {booking.userId?.name}
                </h2>

                <p className="text-gray-500">{booking.userId?.email}</p>
              </div>

              <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700">
                {booking.status}
              </span>
            </div>

            <div className="mt-5">
              <p className="font-medium">Tests:</p>

              <p>{booking.tests?.map((test) => test.testName).join(", ")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-5">
              <div>
                <p className="text-xs text-gray-400">Date</p>

                <p>{new Date(booking.appointmentDate).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Time</p>

                <p>{booking.timeSlot}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Address</p>

                <p>{booking.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
