
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; 

export const getAllHotelProperties = async () => {
  const response = await axios.get(`${BASE_URL}/property/all`);
  return response.data;
};
