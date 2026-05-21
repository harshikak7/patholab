import React from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
        <Route path='/reset-Password/:token' element={<ResetPassword/>}></Route>
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