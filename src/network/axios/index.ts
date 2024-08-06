import axios from 'axios';
  import { createAndSignApiKey } from '../../utils/apiKey';

console.log(process.env.NEXT_PUBLIC_API_BASE_URL,"public")
const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/', // Replace with your API base URL
  // baseURL: 'http://localhost:8000/', // Replace with your API base URL
  // baseURL: 'http://15.206.145.69:8000/', // Replace with your API base URL
  baseURL: 'http://192.168.29.90:8000/', // Replace with your API base URL
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});
const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET; // Ensure this environment variable is set

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {

    console.log(API_SECRET)
    const apiKey = createAndSignApiKey(API_SECRET);
    config.headers['X-API-KEY'] = apiKey;
    return config;
  },
  
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
