import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth';

export const register = async (data) => {
  console.log(data)
  const response = await axios.post(API_URL + '/register', data);
  console.log(response)
  return response.data;
};

export default {
  register
};