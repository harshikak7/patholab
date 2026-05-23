import React from "react";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();

  const booking =
    JSON.parse(
      sessionStorage.getItem(
        "bookingDraft"
      )
    );

  if (!booking) {
    return (
      <div className="p-20">
        No booking found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F7F7F7] py-24">

      <div className="max-w-225 mx-auto">

        <div className="bg-white p-10 rounded-[30px]">

          <h1 className="text-5xl font-bold mb-10">
            Booking Summary
          </h1>

          <div className="space-y-5">

            <Row
              label="Test"
              value={booking.test}
            />

            <Row
              label="Name"
              value={booking.name}
            />

            <Row
              label="Phone"
              value={booking.phone}
            />

            <Row
              label="Date"
              value={booking.date}
            />

            <Row
              label="Address"
              value={
                booking.address
              }
            />

            <Row
              label="Slot"
              value={booking.slot}
            />

            <Row
              label="Email"
              value={
                booking.email
              }
            />

          </div>

          <button
            onClick={() =>
              navigate(
                "/payment"
              )
            }
            className="mt-12 bg-blue-500 text-white px-12 py-4 rounded-full"
          >
            Continue Payment
          </button>

        </div>

      </div>

    </section>
  );
};

const Row = ({
  label,
  value,
}) => (
  <div className="flex justify-between border-b pb-4">
    <span>{label}</span>

    <span>{value}</span>
  </div>
);

export default Booking;