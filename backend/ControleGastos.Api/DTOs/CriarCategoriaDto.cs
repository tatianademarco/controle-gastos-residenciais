using ControleGastos.Api.Models;
using System;

public class CriarCategoriaDto
{
    public string Descricao { get; set; } = string.Empty;
    public FinalidadeCategoria Finalidade { get; set; }
}