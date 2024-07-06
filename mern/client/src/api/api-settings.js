import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || "https://frederic-forster.com/api";
const api = axios.create({
    baseURL: BACKEND_API_URL
});

export default api;