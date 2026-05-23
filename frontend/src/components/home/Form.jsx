import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import formImg from "../../assets/form-image.png";

const Form = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    test: "",
    name: "",
    phone: "",
    date: "",
    address: "",
    slot: "",
    email: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    if (!form.test.trim()) return alert("Enter test");

    if (!form.name.trim()) return alert("Enter name");

    if (!/^\d{10}$/.test(form.phone)) return alert("Enter valid mobile");

    if (!form.date) return alert("Select date");

    if (form.date < today) return alert("Past dates not allowed");

    if (!form.address.trim()) return alert("Enter address");

    if (!form.slot) return alert("Select time slot");

    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      return alert("Invalid email");

   

    sessionStorage.setItem("bookingDraft", JSON.stringify(form));

    navigate("/booking");
  };

  return (
    <section className="bg-[#F7F7F7] py-10">
      <div className="max-w-350 mx-auto px-6">
        {/* Heading */}
        <h2 className=" text-center text-[32px] md:text-[44px] font-bold mb-14">
          Schedule Home Collection
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <div>
            <img
              src={formImg}
              alt="Home Collection"
              className="
              w-full
              h-full
              rounded-[28px]
              object-cover
              "
            />
          </div>

          {/* Right Form */}
          <div
            className="
            bg-white
            rounded-[28px]
            p-8
            shadow-sm
            "
          >
            <h3 className="text-[32px] font-semibold mb-4">Fill Details</h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Search */}
              <div>
                <label className="block mb-2">Search Test</label>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input 
                    type="text" name="test" value={form.test} onChange={handleChange}
                    placeholder="Enter Test Name"
                    className="w-full border rounded-xl pl-11 py-3 outline-none border-gray-400 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block mb-2">Full Name</label>

                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Enter your Name"
                  className="w-full border rounded-xl px-5 py-4 outline-none border-gray-400 focus:border-blue-500"
                />
              </div>

              {/* Contact + Date */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block mb-2">Contact</label>

                  <input
                    type="text" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full border  border-gray-400 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block mb-2">Preferred Date</label>

                  <input
                    type="date" name="date" value={form.date} onChange={handleChange}
                    className="w-full border  border-gray-400 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Address</label>

                <textarea
                  rows="2" name="address" value={form.address} onChange={handleChange}
                  placeholder="Enter Full Address"
                  className="w-full border  border-gray-400 rounded-xl px-5 py-4 resize-none outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Preferred Time Slot</label>

                <select name="slot" value={form.slot} onChange={handleChange} className="w-full border  border-gray-400 rounded-xl px-5 py-4 outline-none focus:border-blue-500">
                  <option>Select Slot</option>

                  <option>09:00 AM – 11:00 AM</option>

                  <option>11:00 AM – 01:00 PM</option>

                  <option>01:00 PM – 03:00 PM</option>

                  <option>03:00 PM - 05:00 PM</option>

                  <option>05:00 PM – 07:00 PM</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2">Enter Email ID</label>

                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="Email"
                  className="w-full border  border-gray-400 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
                />
              </div>

              <div className=" flex items-start ">
                {/* Checkbox */}
                <label className="flex items-center">
                  <input type="checkbox" required />

                  <span className="text-sm ml-2 text-gray-500">
                    I agree to the Terms & Conditions and Privacy Policy
                  </span>
                </label>
              </div>

              {/* Button */}
              <button
                type="submit"
                className=" w-full  md:w-50   block  mx-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 transition"
              >
                Schedule Collection
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
