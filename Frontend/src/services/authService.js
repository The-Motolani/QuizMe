import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/account/";

export const registerUser = async (formData) => {
  const response = await axios.post(
    `${API_BASE_URL}/register/`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
