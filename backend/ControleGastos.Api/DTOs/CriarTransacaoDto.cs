using ControleGastos.Api.Models;
using System;

public class CriarTransacaoDto
{
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public int PessoaId { get; set; }
    public int CategoriaId { get; set; }
}