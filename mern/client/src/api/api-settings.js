import axios from 'axios';

const backendApiUrl = process.env.BACKEND_API_URL || 'http://localhost:3001/api';
console.log(process.env.BACKEND_API_URL)
const api = axios.create({

    baseURL: backendApiUrl
});

export default api;