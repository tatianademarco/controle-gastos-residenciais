import api from "../services/api";
import { CriarTransacao, TransacaoResponse } from '../models/Transacao';
import { extrairErro } from "./errorHandler";

export const transacoesService = {
    listar: async () => {
        try {
            return await api.get<TransacaoResponse[]>("/transacoes");
        } catch (error: any) {
            throw extrairErro(error);
        }
    },

    criar: async (transacao: CriarTransacao) => {
        try {
            return await api.post("/transacoes", transacao);
        } catch (error: any) {
            throw extrairErro(error);
        }
    },

    deletar: async (id: number) => {
        try {
            return await api.delete(`/transacoes/${id}`);
        } catch (error: any) {
            throw extrairErro(error);
        }
    },
};
