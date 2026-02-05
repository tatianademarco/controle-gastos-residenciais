import api from "../services/api";
import { Pessoa } from '../models/Pessoa';
import { extrairErro } from "./errorHandler";

// export const pessoasService = {
//     listar: () => api.get<Pessoa[]>("/pessoas"),
//     criar: (pessoa: { nome: string; idade: number }) => api.post("/pessoas", pessoa),
//     deletar: (id: number) => api.delete(`/pessoas/${id}`),
//     editar: (id: number, pessoa: { nome: string; idade: number }) =>
//         api.put(`/pessoas/${id}`, pessoa)
// };

export const pessoasService = {
    listar: async () => {
        try {
            return await api.get<Pessoa[]>("/pessoas");
        } catch (error: any) {
            throw extrairErro(error);
        }
    },

    criar: async (pessoa: { nome: string; idade: number }) => {
        try {
            return await api.post("/pessoas", pessoa);
        } catch (error: any) {
            throw extrairErro(error);
        }
    },

    deletar: async (id: number) => {
        try {
            return await api.delete(`/pessoas/${id}`);
        } catch (error: any) {
            throw extrairErro(error);
        }
    },

     editar: async (id: number, pessoa: { nome: string; idade: number }) => {
        try {
            return await api.put(`/pessoas/${id}`, pessoa);
        } catch (error: any) {
            throw extrairErro(error);
        }
    },
};
