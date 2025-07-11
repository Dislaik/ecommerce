import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth';

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

export default {
  getUsers,
  getUserById,
  createUser
};