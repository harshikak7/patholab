import React, { useState } from "react";
import logo from "../../assets/logo.svg";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { Menu, X, User, ChevronDown, LogOut } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import { logoutUser } from "../../services/authService";
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

  const navigate = useNavigate();

  const { user, setUser, loading } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();

    setUser(null);

    navigate("/");
  };
  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white shadow-sm">
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
          {!loading &&
            (user ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User size={18} />
                  </div>

                  <ChevronDown size={18} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 bg-white rounded-2xl shadow-xl w-52 overflow-hidden">
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={() => navigate("/my-bookings")}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50"
                    >
                      My Bookings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden lg:flex bg-blue-600 text-white px-12 py-2.5 rounded-3xl hover:bg-[#174dff] transition"
              >
                Login
              </Link>
            ))}

          {/* Mobile */}

          <button onClick={() => setOpen(!open)} className="lg:hidden">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}

      {open && (
        <div className="lg:hidden bg-white shadow-xl px-6 py-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className=" text-lg font-medium "
              >
                {item.title}
              </Link>
            ))}

            {!loading &&
              (user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={18} />
                    </div>

                    <ChevronDown size={18} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 bg-white rounded-2xl shadow-xl w-52 overflow-hidden">
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50"
                      >
                        Dashboard
                      </button>

                      <button
                        onClick={() => navigate("/my-bookings")}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50"
                      >
                        My Bookings
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden lg:flex bg-blue-600 text-white px-12 py-2.5 rounded-3xl hover:bg-[#174dff] transition"
                >
                  Login
                </Link>
              ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
