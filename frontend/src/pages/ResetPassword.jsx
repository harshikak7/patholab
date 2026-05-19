import React, { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { resetPassword } from "../services/authService.js";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");

      return;
    }

    try {
      const response = await resetPassword({
        token,
        password,
      });

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-xl mb-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-3 rounded-xl"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white w-full py-3 rounded-xl"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
