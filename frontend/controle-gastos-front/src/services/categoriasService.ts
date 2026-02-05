import api from "../services/api";
import { Categoria } from '../models/Categoria';
import { extrairErro } from "./errorHandler";

// export const categoriasService = {
//     listar: () => api.get<Categoria[]>("/categorias"),
//     criar: (categoria: Omit<Categoria, "id">) => api.post("/categorias", categoria),
//     deletar: (id: number) => api.delete(`/categorias/${id}`),
// };

export const categoriasService = {
    listar: async () => {
        try {
            return await api.get<Categoria[]>("/categorias");
        } catch (error: any) {
            throw extrairErro(error);
        }
    },

    criar: async (categoria: Omit<Categoria, "id">) => {
        try {
            return await api.post("/categorias", categoria);
        } catch (error: any) {
            throw extrairErro(error);
        }
    },

    deletar: async (id: number) => {
        try {
            return await api.delete(`/categorias/${id}`);
        } catch (error: any) {
            throw extrairErro(error);
        }
    },
};
