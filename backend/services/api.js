import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signupUser = async (userData) => {
  try {
    const response = await api.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
