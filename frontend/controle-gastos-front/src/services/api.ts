import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5023/api', // porta do backend
});

export default api;