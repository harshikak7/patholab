import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';
import Signup from './Signup';
import {Lock, Mail} from 'lucide-react'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 sm:p-8">
      <div className='w-full max-w-md bg-gray-100 rounded-3xl shadow-md sm:p-8 '>
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
        <div className='grid grid-cols-2 border border-gray-400 rounded-xl overflow-hidden mb-2 text-sm sm:text-base m-3 sm:mx-0'>
          <Link to={Signup} className='py-2 sm:py-3 text-center text-gray-600 hover:bg-gray-50 transition rounded-xl'>Sign up</Link>
          <Link to={Login} className='py-2 sm:py-3  text-center font-semibold bg-white rounded-xl '>Log in</Link>
        </div>

        {/* Forms */}
        {/* Email */}
        <form className='space-y-2 sm:space-y-2'>
          <div className='px-4 sm:px-0'>
          <label className='block mb-2 text-gray-600 font-medium'>Email</label>
          <div className='relative'>
            <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input type='email' placeholder='Enter your email' className='w-full border border-gray-300 rounded-xl py-2 sm:py-3 pl-11 sm:pl-12  pr-12 outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>
        </div>

        {/* Password */}
        <div className='px-4 sm:px-0' >
          <label className='block mb-2 mt-2 font-medium text-gray-600'>Password</label>
          <div className='relative'>
            <Lock size={20} className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'/>
            <input type="password" placeholder='Enter your password' className='w-full border border-gray-300 rounded-xl py-2 sm:py-3 pl-11 sm:pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>
        </div>

        {/* Forget */}
        <div className='flex items-center justify-between mt-2 text-xxs px-4 sm:px-0'>
          <label className='flex items-center gap-2 text-gray-600 leading-tight'><input size={60} type="checkbox" />Remember for 30 days</label>
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