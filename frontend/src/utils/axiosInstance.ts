import axios from 'axios';

const axiosInstance = axios.create();

// Get the JWT token from local storage or cookie
const token = localStorage.getItem('token');

if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
