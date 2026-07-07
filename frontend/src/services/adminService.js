import axios from "axios";

export const getAllBookings = async () => {
  const response = await axios.get("http://localhost:5000/admin/bookings", {
    withCredentials: true,
  });

  return response.data;
};

export const getDashboard = async () => {
  const response = await axios.get("http://localhost:5000/admin/dashboard", {
    withCredentials: true,
  });

  return response.data;
};

export const uploadReport = async (bookingId, file) => {
  const formData = new FormData();

  formData.append("bookingId", bookingId);

  formData.append("report", file);

  const response = await axios.post(
    "http://localhost:5000/reports/upload",

    formData,

    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const getReports = async () => {
  const res = await axios.get("http://localhost:5000/reports/admin", {
    withCredentials: true,
  });

  return res.data;
};

export const getReportByBooking = async (bookingId) => {
  const res = await axios.get(`http://localhost:5000/reports/${bookingId}`, {
    withCredentials: true,
  });

  return res.data;
};

export const replaceReport = async (bookingId, file) => {
  const formData = new FormData();

  formData.append("bookingId", bookingId);

  formData.append("report", file);

  const res = await axios.post(
    "http://localhost:5000/reports/upload",
    formData,
    {
      withCredentials: true,
    },
  );

  return res.data;
};

export const getTechnicians = async () => {
  const response = await axios.get("http://localhost:5000/admin/technicians", {
    withCredentials: true,
  });

  return response.data;
};

export const assignTechnician = async (bookingId, technicianId) => {
  const response = await axios.put(
    `http://localhost:5000/admin/bookings/${bookingId}/assign`,
    {
      technicianId,
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
};
