using System;

namespace ControleGastos.Api.Models;

public enum FinalidadeCategoria
{
    Despesa = 1,
    Receita = 2,
    Ambas = 3
}

public class Categoria
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public FinalidadeCategoria Finalidade { get; set; }

    public List<Transacao> Transacoes { get; set; } = new();
}