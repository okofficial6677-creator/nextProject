import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const user_login = async (formData) => {
  const response = await axios.post(`${BASE_URL}/login`, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
