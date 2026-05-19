import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Mail } from "lucide-react";
import { forgotPassword } from "../services/AuthService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    try {
      const response = await forgotPassword({
        email,
      });
      alert(response?.data?.message);
    } catch (error) {
      console.log(error);

      console.log(error.response);

      console.log(error.response?.data);

      alert(error.response?.data?.message || "Failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-3xl"
      >
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Patholab Logo"
            className="w-12 h-12 sm:w-18 sm:h-18 object-contain"
          ></img>
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="font-bold text-xl sm:text-3xl mb-2 text-gray-900">
            Login to your account
          </h1>
          <p className="text-gray-600 text-xs sm:text-base ">
            Welcome back! Please enter your details
          </p>
        </div>

        <div className="relative">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl py-2.5 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
