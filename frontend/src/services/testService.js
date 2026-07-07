import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getTests = async () => {
  const response = await axios.get(`${API}/tests`);

  return response.data;
};