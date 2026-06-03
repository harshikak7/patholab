import React, { useEffect, useState } from "react";

import Navbar from "../components/home/Navbar";

import { useParams } from "react-router-dom";

import { Calendar, Clock3, MapPin, FileText, CheckCircle2 } from "lucide-react";

import { getBookingById } from "../services/bookingService";

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
          {/* LEFT */}

          <div className="bg-white rounded-[32px] p-8">
            <h2 className="text-2xl font-bold">Tests Included</h2>

            <div className="space-y-6 mt-8">
              {booking.tests.map((test) => (
                <div key={test._id} className="border-b pb-6">
                  <h3 className="text-xl font-semibold">{test.testName}</h3>

                  <p className="text-gray-500 mt-3">{test.description}</p>

                  <div className="flex gap-6 mt-5 text-sm">
                    <span>Reports: {test.reportTime}</span>

                    <span>
                      Preparation:{" "}
                      {test.preparationRequired ? "Required" : "Not Required"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-6">
              <h3 className="font-semibold text-lg">Appointment Details</h3>

              <div className="space-y-4 mt-6">
                <div className="flex gap-3">
                  <Calendar size={18} />
                  {new Date(booking.appointmentDate).toLocaleDateString()}
                </div>

                <div className="flex gap-3">
                  <Clock3 size={18} />
                  {booking.timeSlot}
                </div>

                <div className="flex gap-3">
                  <MapPin size={18} />
                  {booking.address}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-6">
              <h3 className="font-semibold text-lg">Status</h3>

              <div className="mt-4 flex items-center gap-3">
                <CheckCircle2 className="text-green-500" />

                <span>{booking.status}</span>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-6">
              <h3 className="font-semibold text-lg">Home Collection</h3>

              <p className="text-gray-500 mt-3">
                Our certified technician will visit your location and collect
                samples safely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
