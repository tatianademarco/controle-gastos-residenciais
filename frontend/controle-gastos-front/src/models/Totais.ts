export interface TotalPorPessoa {
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotaisPorPessoaResponse {
  itens: TotalPorPessoa[];
  totalReceitas: number;
  totalDespesas: number;
  saldoGeral: number;
}

export interface TotalPorCategoria {
  descricao: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotaisPorCategoriaResponse {
  itens: TotalPorCategoria[];
  totalReceitas: number;
  totalDespesas: number;
  saldoGeral: number;
}
