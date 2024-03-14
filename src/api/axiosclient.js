import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 10000, // Optional: Set request timeout
});

export default instance;