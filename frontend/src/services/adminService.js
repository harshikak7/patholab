import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getAllBookings = async () => {
  const response = await axios.get(`${API}/admin/bookings`, {
    withCredentials: true,
  });

  return response.data;
};

export const getDashboard = async () => {
  const response = await axios.get(`${API}/admin/dashboard`, {
    withCredentials: true,
  });

  return response.data;
};

export const uploadReport = async (bookingId, file) => {
  const formData = new FormData();

  formData.append("bookingId", bookingId);

  formData.append("report", file);

  const response = await axios.post(
    `${API}/reports/upload`,

    formData,

    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const getReports = async () => {
  const res = await axios.get(`${API}/reports/admin`, {
    withCredentials: true,
  });

  return res.data;
};

export const getReportByBooking = async (bookingId) => {
  const res = await axios.get(`${API}/reports/${bookingId}`, {
    withCredentials: true,
  });

  return res.data;
};

export const replaceReport = async (bookingId, file) => {
  const formData = new FormData();

  formData.append("bookingId", bookingId);

  formData.append("report", file);

  const res = await axios.post(
    `${API}/reports/upload`,
    formData,
    {
      withCredentials: true,
    },
  );

  return res.data;
};

export const getTechnicians = async () => {
  const response = await axios.get(`${API}/admin/technicians`, {
    withCredentials: true,
  });

  return response.data;
};

export const assignTechnician = async (bookingId, technicianId) => {
  const response = await axios.put(
    `${API}/admin/bookings/${bookingId}/assign`,
    {
      technicianId,
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
};
