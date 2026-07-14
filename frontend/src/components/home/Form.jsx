import React, { useState } from "react";
import Swal from "sweetalert2";
import formImg from "../../assets/form-image.png";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Name Required",
        text: "Please enter your full name.",
      });
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Mobile Number",
        text: "Please enter a valid 10-digit mobile number.",
      });
    }

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
    }

    if (!form.city) {
      return Swal.fire({
        icon: "warning",
        title: "Select City",
        text: "Please choose your city.",
      });
    }

    Swal.fire({
      icon: "success",
      title: "Callback Requested",
      text: "Thank you! Our team will contact you shortly.",
    });

    setForm({
      name: "",
      phone: "",
      email: "",
      city: "",
    });
  };

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-[32px] md:text-[44px] font-bold mb-14">
          Request a Callback
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Image */}

          <div>
            <img
              src={formImg}
              alt="Request Callback"
              className="w-full h-full rounded-[28px] object-cover"
            />
          </div>

          {/* Right Form */}

          <div className="bg-white rounded-[28px] p-8 shadow-sm">
            <h3 className="text-[32px] font-semibold mb-2">
              Need Assistance?
            </h3>

            <p className="text-gray-500 mb-8">
              Leave your details and our healthcare team will get in touch to
              help you choose the right diagnostic test.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}

              <div>
                <label className="block mb-2 font-medium">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
                />
              </div>

              {/* Phone */}

              <div>
                <label className="block mb-2 font-medium">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
                />
              </div>

              {/* Email */}

              <div>
                <label className="block mb-2 font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email (Optional)"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
                />
              </div>

              {/* City */}

              <div>
                <label className="block mb-2 font-medium">Select City</label>

                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
                >
                  <option value="">Choose your city</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Thane</option>
                  <option>Navi Mumbai</option>
                  <option>Nagpur</option>
                  <option>Nashik</option>
                </select>
              </div>

              {/* Terms */}

              <label className="flex items-start gap-2 text-sm text-gray-500">
                <input type="checkbox" required className="mt-1" />
                <span>
                  I agree to be contacted by the PathoLab team regarding my
                  enquiry.
                </span>
              </label>

              {/* Button */}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-medium transition"
              >
                Request Callback
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;