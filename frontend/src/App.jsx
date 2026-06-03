import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookTest from "./pages/BookTest";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import MyBookings from "./pages/MyBookings";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
            <Route path="/reset-Password/:token" element={<ResetPassword />}></Route>
            
            <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>}></Route>
            <Route path="/booking/cart" element={<ProtectedRoute><Booking /></ProtectedRoute>}></Route>
            
            <Route path="/book-test" element={<BookTest />}></Route>
            <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>}></Route>
            <Route path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
