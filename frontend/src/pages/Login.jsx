import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import {Lock, Mail,Eye, EyeOff} from 'lucide-react'
import { loginUser } from '../services/authService';

const Login = () => {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email:"",
    password:"",
  })

  const handleChange=(e)=>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email");
      return;
    }

    try {
      const response = await loginUser(formData);
      alert(response.data.message);
      console.log(response.data);
      navigate('/dashboard')
    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
  }
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 overflow-y-auto">
      <div className='w-full max-w-2xl bg-white rounded-3xl shadow-md p-5 sm:p-6'>
        {/*Logo Section */}
        <div className='flex justify-center'>
          <img src={logo} alt='Patholab Logo' className='w-12 h-12 sm:w-18 sm:h-18 object-contain'></img>
        </div>

        {/* Heading */}
        <div className='text-center mb-4'>
          <h1 className='font-bold text-xl sm:text-3xl mb-2 text-gray-900'>Login to your account</h1>
          <p className='text-gray-600 text-xs sm:text-base '>Welcome back! Please enter your details</p>
        </div>

        {/* Tabs */}
        <div className='grid grid-cols-2 border border-gray-300 rounded-xl overflow-hidden mb-5 text-sm sm:text-base'>
          <Link to='/signup' className='py-2.5 text-center text-gray-600 hover:bg-gray-50 transition'>Sign up</Link>
          <Link to='/login' className='py-2.5 text-center font-semibold border-l border-gray-300 bg-white '>Log in</Link>
        </div>

        {/* Forms */}
        {/* Email */}
        <form onSubmit={handleSubmit} className='space-y-2 sm:space-y-2'>
        <div>
            <label className="block mb-2 text-gray-600 font-medium text-sm sm:text-base">
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email" name='email' value={formData.email} onChange={handleChange}
                placeholder="Enter your email"
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

              <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
>

  {
    showPassword
      ? <EyeOff size={20} />
      : <Eye size={20} />
  }

</button>
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"} name='password' value={formData.password} onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-xl py-2.5 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>
          </div>

        {/* Forget */}
        <div className='flex items-center justify-between text-xs sm:text-sm px-4 sm:px-0'>
          <label className='flex items-center gap-2 text-gray-600 '><input size={60} className="mt-1 w-4 h-4" type="checkbox" />Remember for 30 days</label>
          <button className='text-blue-600 font-medium hover:underline whitespace-nowrap leading-tight'>Forgot Password</button>
        </div>

        {/* Login */}
        <div className='px-4 sm:px-0'>
          <button type='submit' className='bg-blue-600 hover:bg-blue-700 rounded-xl mt-4 text-white w-full py-3'>Sign in</button>
        </div>
        {/* divider */}
        <div className="flex items-center gap-4 mt-2 px-4 sm:px-0">
            <div className="flex-1 h-px bg-gray-200 "></div>
            <span className="text-sm text-gray-400 ">
              or
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google */}
        <div className='px-4 sm:px-0'>
          <button type='button' className='w-full rounded-xl border border-gray-300 mt-2 hover:bg-gray-200 transition flex items-center justify-center gap-3 py-3 sm:py-3 text-sm sm:text-base font-medium '><img className='h-4 sm:h-6' src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" />Sign in with Google</button>
        </div>
        </form>

        {/* Bottom */}
        <p className="text-center text-gray-500 mt-4 mb-4 sm:mb-0 text-xs sm:text-[2vh]">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;