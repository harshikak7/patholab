import React, { useState, useEffect } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../services/bookingService";

const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const booking = JSON.parse(sessionStorage.getItem("bookingDraft")) || {};

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState(null);
  const [form, setForm] = useState({
    name: booking.name || "",
    phone: booking.phone || "",
    date: booking.date || "",
    slot: booking.slot || "",
    address: booking.address || "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/tests/${id}`)
      .then((res) => res.json())
      .then((data) => setTest(data));
  }, [id]);

  if (!test) {
    return <div className="p-20">Loading...</div>;
  }
  // if (!booking) {
  //   return <div className="p-20">No booking found</div>;
  // }

  // const test = {
  //   name: form.test || "Full Body Checkup",
  //   price: 1400,
  //   description: "Comprehensive body health screening package.",
  //   fasting: true,
  //   duration: "10 Minutes",
  //   reports: "24 Hours",
  //   includes: ["CBC", "Liver Function", "Lipid Profile", "Thyroid"],
  // };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const payload = {
        tests: [id],

        appointmentDate: form.date,

        timeSlot: form.slot,

        address: form.address,
      };

      await createBooking(payload);

      sessionStorage.removeItem("bookingDraft");

      setStep(3);
    } catch (error) {
      alert(error?.response?.data?.message || "Booking Failed");

      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen bg-[#F7F7F7] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          {/* LEFT */}

          <div className="bg-white rounded-[30px] p-8 h-fit">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
            >
              <ChevronLeft size={18} />
              Back
            </button>

            <div className="mt-8">
              <span className="text-sm text-blue-500 font-medium">
                {test.category}
              </span>

              <h1 className="text-3xl font-bold mt-3">{test.testName}</h1>

              <p className="mt-4 text-gray-500 leading-relaxed">
                {test.description}
              </p>

              <div className="mt-8 space-y-4">
                <InfoRow title="Price" value={`₹${test.price}`} />

                <InfoRow
                  title="Preparation Required"
                  value={test.preparationRequired ? "Yes" : "No"}
                />

                <InfoRow title="Reports" value={`${test.reportTime} Hours`} />
              </div>

              <div className="mt-10 bg-blue-50 rounded-2xl p-5">
                <h3 className="font-semibold">Important Note</h3>

                <div className="mt-4 flex items-start gap-3 text-sm text-gray-600">
                  <Check size={18} className="text-green-600 mt-0.5" />

                  <p>
                    Please ensure the patient is available during the selected
                    slot.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="bg-white rounded-[30px] p-8">
            {/* STEP HEADER */}

            <div className="flex items-center justify-between border-b pb-6">
              <Step
                title="Information"
                active={step === 1}
                completed={step > 1}
              />

              <div className="flex-1 h-px bg-gray-200 mx-4" />

              <Step title="Payment" active={step === 2} completed={step > 2} />

              <div className="flex-1 h-px bg-gray-200 mx-4" />

              <Step title="Confirmed" active={step === 3} completed={false} />
            </div>

            {/* STEP 1 */}

            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mt-10">Booking Details</h2>

                <div className="mt-8 grid md:grid-cols-2  gap-5">
                  <Input
                    label="Full Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />

                  <Input
                    label="Phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                  />

                  <Input
                    type="date"
                    label="Date" 
                    value={form.date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                  />

                  <div>
                    <label className="block mb-2 text-sm">Time Slot</label>

                    <select
                      value={form.slot}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          slot: e.target.value,
                        })
                      }
                      className="w-full border border-gray-400 rounded-xl px-5 py-4"
                    >
                      <option value="">Select Slot</option>

                      <option>09:00 AM</option>

                      <option>10:00 AM</option>

                      <option>11:00 AM</option>

                      <option>12:00 PM</option>

                      <option>02:00 PM</option>

                      <option>03:00 PM</option>

                      <option>04:00 PM</option>
                    </select>
                  </div>
                </div>

                <textarea
                  rows="4"
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                  placeholder="Enter Address"
                  className="mt-5 w-full border rounded-xl p-4 outline-none focus:border-blue-500"
                />

                <button
                  onClick={() => setStep(2)}
                  className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-full transition"
                >
                  Continue Payment
                </button>
              </div>
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-500 hover:text-black transition mt-8"
                >
                  ← Back to Information
                </button>

                <h2 className="text-2xl font-bold mt-6">Payment</h2>

                <div className="mt-8 border border-gray-200 rounded-3xl p-6">
                  <div className="flex justify-between items-center border-b pb-5">
                    <span>Total Amount</span>

                    <span className="text-2xl font-semibold">
                      ₹{test.price}
                    </span>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-full transition"
                  >
                    {loading ? "Processing..." : "Fake Pay"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}

            {step === 3 && (
              <div className="text-center py-20">
                <div className="text-6xl">✅</div>

                <h2 className="text-4xl font-bold mt-6">Booking Confirmed</h2>

                <p className="mt-4 text-gray-500">
                  Technician details will appear once assigned.
                </p>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="mt-10 bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-full transition"
                >
                  Go Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Step = ({ title, active, completed }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
        ${
          active
            ? "bg-blue-500 text-white"
            : completed
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-500"
        }`}
      >
        {completed ? "✓" : ""}
      </div>

      <span
        className={`text-sm font-medium ${
          active ? "text-black" : "text-gray-400"
        }`}
      >
        {title}
      </span>
    </div>
  );
};

const Input = ({ label, value, onChange, type = "text" }) => {
  return (
    <div>
      <label className="block mb-2 text-sm">{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-400 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
      />
    </div>
  );
};

const InfoRow = ({ title, value }) => {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{title}</span>

      <span className="font-medium">{value}</span>
    </div>
  );
};

export default Booking;
