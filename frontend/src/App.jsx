import React from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import Booking from './pages/Booking'
import BookTest from './pages/BookTest'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
        <Route path='/reset-Password/:token' element={<ResetPassword/>}></Route>
        <Route path='/booking/:id' element={<Booking/>}></Route>
        <Route path='/book-test' element={<BookTest/>}></Route>
        <Route path='dashboard' element={
          <ProtectedRoute>
            <Dashboard />
            
          </ProtectedRoute>
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App