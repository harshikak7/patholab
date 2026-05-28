import axios from 'axios';

const API= "http://localhost:5000/bookings";

export const createBooking=async(bookingData)=>{
    const token=localStorage.getItem('token')

    const response=await axios.post(API,bookingDate,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data
}