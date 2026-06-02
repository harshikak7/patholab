import axios from 'axios';

const API= "http://localhost:5000/bookings";

export const createBooking=async(bookingDate)=>{
    const token=localStorage.getItem('token')

    const response=await axios.post(API,bookingDate,{
       withCredentials:true,
    })
    return response.data
}