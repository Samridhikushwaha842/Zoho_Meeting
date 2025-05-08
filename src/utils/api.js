import axios from 'axios';

const signupUser = async (userData) => {
  return axios.post('http://localhost:5000/api/signup', userData);
};

export default signupUser