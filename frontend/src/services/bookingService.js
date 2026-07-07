import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const createBooking = async (bookingDate) => {
   const token=localStorage.getItem('token')
  const response = await axios.post(
    `${API}/bookings`,
    bookingDate,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getMyBookings = async () => {
  const response = await axios.get(
    `${API}/bookings/my-bookings`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getBookingById = async (id) => {
  const response = await axios.get(
    `${API}/bookings/${id}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};
