import React from "react";
import { Search, ChevronDown } from "lucide-react";

import formImg from "../../assets/form-image.png";

const Form = () => {
  return (
    <section className="bg-[#F7F7F7] py-10">
      <div className="max-w-350 mx-auto px-6">
        {/* Heading */}
        <h2 className=" text-center text-[32px] md:text-[44px] font-bold mb-14">
          Schedule Home Collection
        </h2>

        <div
          className="
          grid
          lg:grid-cols-2
          gap-10
          items-center
          "
        >
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

            <form className="space-y-5">
              {/* Search */}
              <div>
                <label className="block mb-2">Search Test</label>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter Test Name"
                    className="
                    w-full
                    border
                    rounded-xl
                    pl-11
                    py-3
                    outline-none
                    border-gray-400
                    focus:border-blue-500
                    "
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block mb-2">Full Name</label>

                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="
                  w-full
                  border
                  rounded-xl
                  px-5
                  py-4
                  outline-none
                   border-gray-400
                  focus:border-blue-500
                  "
                />
              </div>

              {/* Contact + City */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Contact</label>

                  <input
                    type="text"
                    placeholder="Mobile Number"
                    className=" w-full  border-gray-400  border rounded-xl px-5 py-4 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 ">Select City</label>

                  <div className="relative">
                    <select
                      className="
                      w-full
                      border
                      rounded-xl
                      px-5 
                      py-4
                      appearance-none  border-gray-400
                      outline-none
                      "
                    >
                      <option>City</option>
                      <option>Mumbai</option>
                      <option>Pune</option>
                      <option>Delhi</option>
                    </select>

                    <ChevronDown
                      size={18}
                      className="
                      absolute  text-gray-400
                      right-4
                      top-1/2
                      -translate-y-1/2
                      pointer-events-none
                      "
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2">Enter Email ID</label>

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border  border-gray-400 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
                />
              </div>

              <div className=" flex items-start ">
                {/* Checkbox */}
                <label className="flex items-center">
                  <input type="checkbox" />

                  <span className="text-sm ml-2 text-gray-500">
                    I agree to the Terms & Conditions and Privacy Policy
                  </span>
                </label>
              </div>

              {/* Button */}
              <button className=" w-full  md:w-40   block  mx-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 transition">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
