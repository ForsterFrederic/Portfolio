import axios from 'axios';

// const backendApiUrl = process.env.BACKEND_API_URL || 'http://localhost:3001/api';
const backendApiUrl = 'https://frederic-forster.com/api';

const api = axios.create({

    baseURL: backendApiUrl
});

export default api;