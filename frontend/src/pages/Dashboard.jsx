import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authService'

const Dashboard = () => {

  const navigate=useNavigate()
  
  const handleLogout=async()=>{
    try{
      await logoutUser()
      navigate('/login')
    }
    catch(error){
      alert('Logout failed')
    }
  }
  return (
    <div>
      Dashboard page
      <button onClick={handleLogout} className='bg-blue-500 px-4 py-4 rounded-3xl'>Logout</button>
    </div>
  )
}

export default Dashboard
