import React, { useState } from "react";
import { Router, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import {Menu, X} from 'lucide-react'
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Tests",
      path: "/book-test",
    },
    {
      title: "Appointments",
      path: "/my-bookings",
    },
    {
      title: "Reports",
      path: "/reports",
    },
  ];
  return (
    <header className="absolute top-0 left-0 w-full z-50  ">
      <div className="max-w-8xl mx-auto px-6 lg:px-10">
        <nav className=" h-20 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="PathoLab Logo" className="h-10" />
          </Link>
          <div className="hidden lg:flex items-start gap-10">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-base font-medium transition 
                    ${location.pathname === item.path ? "text-blue-600" : "text-black hover:text-blue-600"}    
                `}
              >
                {item.title}
              </Link>
            ))}
          </div>
          {/* Button Login */}
          <Link
            to="/login"
            className=" hidden lg:flex bg-blue-600 text-white px-12 py-2.5 rounded-3xl hover:bg-[#174dff] transition"
          >
            Login
          </Link>

          {/* Mobile */}

          <button onClick={() => setOpen(!open)} className="lg:hidden">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}

      {open && (
        <div
          className="lg:hidden bg-white shadow-xl px-6 py-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className=" text-lg font-medium " >
                {item.title}
              </Link>
            ))}

            <Link
              to="/login"
              className="bg-blue-600 text-white rounded-full py-3 text-center " >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
