import api from './api';
import { TotaisPorPessoaResponse, TotaisPorCategoriaResponse } from '../models/Totais';
import { extrairErro } from "./errorHandler";

// export const totaisService = {
//   totaisPorPessoa: () => api.get<TotaisPorPessoaResponse>('/totais/por-pessoa'),
//   totaisPorCategoria: () => api.get<TotaisPorCategoriaResponse>('/totais/por-categoria'),
// };

export const totaisService = {
    totaisPorPessoa: async () => {
        try {
            return await api.get<TotaisPorPessoaResponse>('/totais/por-pessoa');
        } catch (error: any) {
            throw extrairErro(error);
        }
    },

    totaisPorCategoria: async () => {
        try {
            return await api.get<TotaisPorCategoriaResponse>('/totais/por-categoria');
        } catch (error: any) {
            throw extrairErro(error);
        }
    },
};
