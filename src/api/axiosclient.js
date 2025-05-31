import axios from "axios";
import { getCookie } from "../components/utils/cookies";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 100000, // Optional: Set request timeout
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = getCookie("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
