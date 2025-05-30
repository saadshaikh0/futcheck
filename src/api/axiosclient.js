import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000, // Optional: Set request timeout
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("access");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
