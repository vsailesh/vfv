import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust port to match your backend

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}; 