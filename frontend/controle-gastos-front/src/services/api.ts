import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5023/api', // porta do backend
});

function extrairErro(error: any): string {
    return error?.response?.data?.erro 
        || error?.response?.data 
        || error?.message 
        || "Erro inesperado ao comunicar com o servidor";
}

export default api;