import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';
import Signup from './Signup';
import {Mail} from 'lucide-react'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className='w-full max-w-md bg-gray-100 rounded-3xl shadow-md sm:p-8 '>
        {/*Logo Section */}
        <div className='flex justify-center mb-4'>
          <img src={logo} alt='Patholab Logo' className='w-18 h-18 object-contain'></img>
        </div>

        {/* Heading */}
        <div className='text-center mb-8'>
          <h1 className='font-bold text-2xl mb-4 text-gray-900'>Login to your account</h1>
          <p className='text-gray-600 '>Welcome back! Please enter your details</p>
        </div>

        {/* Tabs */}
        <div className='grid grid-cols-2 border border-gray-400 rounded-3xl overflow-hidden mb-6'>
          <Link to={Signup} className='py-3 text-center text-gray-600 hover:bg-gray-50 transition rounded-3xl'>Sign up</Link>
          <Link to={Login} className='py-3 text-center font-semibold bg-white rounded-3xl '>Log in</Link>
        </div>

        {/* Forms */}
        {/* Email */}
        <div className='space-y-5'>
          <label className='block mb-2 text-gray-600 font-medium'>Email</label>
          <div className='relative'>
            <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input type='email' placeholder='Enter your email' className='w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500'></input>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;