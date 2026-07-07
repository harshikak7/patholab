import axios from "axios";
const API = import.meta.env.VITE_API_URL;
export const getMyReports = async () => {
  const response = await axios.get(
    `${API}/reports/my-reports`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getReportByBooking = async (bookingId) => {
  const response = await axios.get(
    `${API}/reports/${bookingId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};