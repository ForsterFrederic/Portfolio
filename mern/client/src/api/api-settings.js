import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:3001/api";
console.log(BACKEND_API_URL)
const api = axios.create({
    baseURL: BACKEND_API_URL
});

export default api;