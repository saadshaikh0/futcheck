import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000, // Optional: Set request timeout
});

export default instance;
