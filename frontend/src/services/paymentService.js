import axios from "axios";

export const createOrder =
  async (amount) => {

    const response =
      await axios.post(
        "http://localhost:5000/payment/create-order",
        {
          amount,
        }
      );

    return response.data;
  };