import axios from "axios";

const API =
  "http://localhost:5000/tests";

export const getTests =
  async () => {

    const response =
      await axios.get(API);

    return response.data;
  };