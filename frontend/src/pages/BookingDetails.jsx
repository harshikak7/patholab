import React, { useEffect, useState } from "react";

import Navbar from "../components/home/Navbar";

import { useParams } from "react-router-dom";

import { Calendar, Clock3, MapPin, FileText, CheckCircle2 } from "lucide-react";

import { getBookingById } from "../services/bookingService";

import { getReportByBooking } from "../services/reportService";
const BookingDetails = () => {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const data = await getBookingById(id);

      setBooking(data);
    };

    fetchBooking();
  }, [id]);

  if (!booking) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
        <h1 className="text-5xl font-bold">Booking Details</h1>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 mt-10">
          {/* LEFT SIDE */}

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold">Test Information</h2>

            <div className="space-y-10 mt-8">
              {booking.tests.map((test) => (
                <div key={test._id} className="border-b border-gray-100 pb-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                    {test.category}
                  </span>

                  <h3 className="text-2xl font-bold mt-4">{test.testName}</h3>

                  <p className="mt-5 text-gray-600 leading-8">
                    {test.description}
                  </p>

                  {/* DETAILS */}

                  <div className="grid md:grid-cols-2 gap-4 mt-8">
                    <div className="bg-[#F7F8FC] rounded-2xl p-4">
                      <p className="text-gray-400 text-sm">Reports Available</p>

                      <p className="font-semibold mt-1">{test.reportTime}</p>
                    </div>

                    <div className="bg-[#F7F8FC] rounded-2xl p-4">
                      <p className="text-gray-400 text-sm">Fasting Required</p>

                      <p className="font-semibold mt-1">
                        {test.preparationRequired ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>

                  {/* BENEFITS */}

                  <div className="mt-8">
                    <h4 className="font-semibold text-lg">
                      Why take this test?
                    </h4>

                    <ul className="mt-4 space-y-2 text-gray-600">
                      <li>✓ Helps identify health conditions early</li>

                      <li>✓ Supports preventive healthcare</li>

                      <li>✓ Recommended for regular health monitoring</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-6">
            {/* STATUS */}
            {/* 
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      <h3 className="font-bold text-xl">
        Booking Status
      </h3>

      <div className="mt-6 space-y-5">

        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          Booking Confirmed
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            booking.status === "Assigned" ||
            booking.status === "Collected" ||
            booking.status === "Completed"
              ? "bg-green-500"
              : "bg-gray-300"
          }`}></div>

          Technician Assigned
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            booking.status === "Collected" ||
            booking.status === "Completed"
              ? "bg-green-500"
              : "bg-gray-300"
          }`}></div>

          Sample Collected
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            booking.status === "Completed"
              ? "bg-green-500"
              : "bg-gray-300"
          }`}></div>

          Report Generated
        </div>

      </div>

    </div> */}

            {/* APPOINTMENT */}

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-xl">Appointment Details</h3>

              <div className="space-y-5 mt-6">
                <div>
                  <p className="text-gray-600 text-sm">Date</p>

                  <p className="font-medium mt-1">
                    {new Date(booking.appointmentDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Time</p>

                  <p className="font-medium mt-1">{booking.timeSlot}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Address</p>

                  <p className="font-medium mt-1">{booking.address}</p>
                </div>
              </div>
            </div>

            {/* TECHNICIAN */}

           <div className="bg-white rounded-2xl p-6 shadow-sm">
  <h3 className="font-bold text-xl">Technician</h3>

  {booking.technicianId ? (
    <div className="mt-5">
      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
        {booking.technicianId.name.charAt(0)}
      </div>

      <p className="font-semibold mt-4">
        {booking.technicianId.name}
      </p>

      <p className="text-gray-500 mt-2">
        {booking.technicianId.phone}
      </p>

      <p className="text-gray-500 text-sm">
        {booking.technicianId.email}
      </p>
    </div>
  ) : (
    <div className="mt-5">
      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
        T
      </div>

      <p className="font-semibold mt-4">
        Not Assigned Yet
      </p>

      <p className="text-gray-500 mt-2 text-sm">
        A certified sample collection executive will be assigned
        before your appointment.
      </p>
    </div>
  )}
</div>

            {/* PAYMENT */}

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-xl">Payment</h3>

              <div className="mt-5">
                <p className="text-3xl font-bold">
                  ₹{booking.tests.reduce((sum, test) => sum + test.price, 0)}
                </p>

                <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                  Paid
                </span>
              </div>
            </div>

            {/* REPORTS */}

            <div className="bg-white rounded-2xl p-6 shadow-sm">
  <h3 className="font-bold text-xl">Reports</h3>

  {booking.reportUpload ? (
    <div className="mt-5">
      <p className="text-green-600 font-medium">
        Your report is ready.
      </p>

      <button
        onClick={async () => {
          const report = await getReportByBooking(booking._id);

          window.open(report.reportUrl, "_blank");
        }}
        className="mt-5 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        View Report
      </button>
    </div>
  ) : (
    <p className="mt-4 text-gray-500">
      Report will be available once sample processing is completed.
    </p>
  )}
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
