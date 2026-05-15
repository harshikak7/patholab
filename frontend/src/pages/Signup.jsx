import { Link } from "react-router-dom";
import {User, Mail, Phone, Lock, MapPin} from "lucide-react";
import logo from "../assets/logo.svg";
import { useState } from 'react';
import { signupUser } from "../services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    address:"",
    password:"",
    confirmPassword:"",
  })

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value,})
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    
    if(
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.password ||
      !formData.confirmPassword
    ){
      alert('Please fill all the details')
      return
    }
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if(!passwordRegex.test(formData.password)){
      alert('Password must contain uppercase, lowercase, number, special character and be at least 8 characters long')
      return
    }

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email)){
      alert('Please enter a valid email address')
      return
    }

    if(formData.password!=formData.confirmPassword){
      alert('Password do not match')
      return
    }

    try{
      const response=await signupUser(formData)
      alert(response.data.message)
      console.log(response.data)
    }
    catch(error){
      alert(error.response?.data?.message || error.response?.data?.error || 'Signup Failed')
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 overflow-y-auto">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-md p-5 sm:p-6">

        {/* Logo */}
        <div className='flex justify-center'>
          <img src={logo} alt='Patholab Logo' className='w-12 h-12 sm:w-18 sm:h-18 object-contain'></img>
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="font-bold text-2xl sm:text-3xl text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Join Patholab and book tests easily
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 border border-gray-300 rounded-xl overflow-hidden mb-5 text-sm sm:text-base">

          <Link
            to="/signup"
            className="py-2.5 text-center font-semibold bg-white"
          >
            Sign up
          </Link>

          <Link
            to="/login"
            className="py-2.5 text-center text-gray-600 border-l border-gray-300 hover:bg-gray-50 transition"
          >
            Log in
          </Link>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Full Name */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium text-sm sm:text-base">
              Full Name
            </label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text" name="name" value={formData.name} onChange={handleChange} 
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl py-2.5 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium text-sm sm:text-base">
              Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange} 
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl py-2.5 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium text-sm sm:text-base">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text" name="phone" value={formData.phone} onChange={handleChange} 
                placeholder="Enter your phone"
                className="w-full border border-gray-300 rounded-xl py-2.5 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium text-sm sm:text-base">
              Address
            </label>
            <div className="relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text" name="address" value={formData.address} onChange={handleChange}  
                placeholder="Enter your address"
                className="w-full border border-gray-300 rounded-xl py-2.5 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium text-sm sm:text-base">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input
                type="password" name="password" value={formData.password} onChange={handleChange} 
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-xl py-2.5 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium text-sm sm:text-base">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} 
                placeholder="Confirm password"
                className="w-full border border-gray-300 rounded-xl py-2.5 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="sm:col-span-2">
            <label className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4"
              />
              <span>
                I agree to the Terms & Conditions and Privacy Policy
              </span>
            </label>
          </div>

          {/* Signup Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl py-2.5 text-sm sm:text-base font-medium"
            >
              Create Account
            </button>
          </div>

          {/* Divider */}
          <div className="sm:col-span-2 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs sm:text-sm text-gray-400">
              or
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google */}
          <div className="sm:col-span-2">
            <button
              type="button"
              className="w-full rounded-xl border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center gap-3 py-2.5 text-sm sm:text-base font-medium"
            >
              <img
                className="h-4 w-4 sm:h-5 sm:w-5"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google Logo"
              />
              Continue with Google
            </button>
          </div>

        </form>
        {/* Bottom */}
        <p className="text-center text-gray-500 mt-5 text-xs sm:text-sm">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in
          </Link>

        </p>

      </div>

    </div>

  );
};

export default Signup;