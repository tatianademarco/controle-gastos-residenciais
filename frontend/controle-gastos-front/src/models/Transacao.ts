export interface CriarTransacao {
    descricao: string;
    valor: number;
    tipo: TipoTransacao;
    pessoaId: number;
    categoriaId: number;
}

export interface TransacaoResponse {
    id: number;
    descricao: string;
    valor: number;
    tipo: TipoTransacao;
    pessoaId: number;
    pessoaNome: string;
    categoriaId: number;
    categoriaDescricao: string;
}

export enum TipoTransacao {
  Despesa = 1,
  Receita = 2
}
