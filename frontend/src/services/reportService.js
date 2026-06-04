import axios from "axios";

export const getMyReports = async () => {
  const response = await axios.get(
    "http://localhost:5000/reports/my-reports",
    {
      withCredentials: true,
    }
  );

  return response.data;
};