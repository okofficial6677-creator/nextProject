
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; 

export const user_reg = async (userData) => {
  const response = await axios.post(`${BASE_URL}/registration/add`, userData);
  return response.data;
};

