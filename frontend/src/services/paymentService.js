import axios from "axios";
const API = import.meta.env.VITE_API_URL;
export const createOrder =
  async (amount) => {

    const response =
      await axios.post(
        `${API}/payment/create-order`,
        {
          amount,
        }
      );

    return response.data;
  };