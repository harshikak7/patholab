import axios from 'axios';

const API= "http://localhost:5000/bookings";

export const createBooking=async(bookingDate)=>{
    const token=localStorage.getItem('token')

    const response=await axios.post(API,bookingDate,{
       withCredentials:true,
    })
    return response.data
}

export const getMyBookings = async () => {
  const response = await axios.get(
    "http://localhost:5000/bookings/my-bookings",
    {
      withCredentials: true,
    }
  );

  return response.data;
};