// lib/axios.js

import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    //Add authorization token or other headers if needed
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    // if (error.response.status === 401) {
    //     // Handle unauthorized error, maybe redirect to login
    // }
    return Promise.reject(error);
  }
);

export default apiClient;
