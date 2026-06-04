import axios from "axios";

export const getAllBookings= async ()=>{
    const response=await axios.get(
        "http://localhost:5000/admin/bookings",
        {
            withCredentials:true
        }
    )
    return response.data
}