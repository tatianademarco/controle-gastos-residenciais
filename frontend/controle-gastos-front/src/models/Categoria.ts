
export enum FinalidadeCategoria {
  Despesa = 1,
  Receita = 2,
  Ambas = 3
}

export interface Categoria {
    id: number;
    descricao: string;
    finalidade: FinalidadeCategoria;
}
