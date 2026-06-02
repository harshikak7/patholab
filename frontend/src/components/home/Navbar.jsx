import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, ChevronDown, LogOut, ShoppingCart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../cart/CartDrawer";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
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

          {/* Cart ig */}
          {/* <div className="flex items-center gap-6">
            <button className="relative">
              <ShoppingCart size={22} />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div> */}

          {/* Button Login */}
          {!loading &&
            (user ? (
              <div className="flex items-center gap-6">
                <button
  onClick={() => setCartOpen(true)}
  className="relative"
>
  <ShoppingCart size={22} />

  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {cartItems.length}
    </span>
  )}
</button>

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
                    <div className="absolute right-0 top-full mt-3 bg-white rounded-2xl shadow-xl w-52 overflow-hidden">
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
      <CartDrawer open={cartOpen} setOpen={setCartOpen} />
    </header>
  );
};

export default Navbar;
