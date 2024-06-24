import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000, // Optional: Set request timeout
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Try to get the access token from localStorage
    const token = localStorage.getItem("access_token");

    // If the token is present, set it in the header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
