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
import BookingDetails from "./pages/BookingDetails";
import MyReports from "./pages/MyReports";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings";
import AdminReport from "./pages/AdminReport";

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

            <Route  path="/booking-details/:id"  element={<ProtectedRoute><BookingDetails /></ProtectedRoute>}/>
            <Route path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/reports" element={<ProtectedRoute><MyReports /></ProtectedRoute>}></Route>
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}></Route>
            <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookings/></ProtectedRoute>}></Route>
            <Route path="/admin/reports" element={<ProtectedRoute><AdminReport /></ProtectedRoute>}></Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
