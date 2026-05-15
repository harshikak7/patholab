import React from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
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