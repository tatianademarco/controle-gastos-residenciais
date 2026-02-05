using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services;

/// <summary>
/// Service responsável por calcular os totais financeiros do sistema.
/// Centraliza todas as regras de negócio relacionadas a somatórios de
/// receitas, despesas e saldos por pessoa e por categoria.
/// </summary>
public class TotaisService
{
    private readonly AppDbContext _context;

    /// <summary>
    /// Construtor com injeção de dependência do DbContext.
    /// </summary>
    public TotaisService(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Calcula os totais de receitas, despesas e saldo para cada pessoa cadastrada,
    /// além de calcular o total geral de todas as pessoas.
    /// </summary>
    /// /// <returns>
    /// Um objeto <see cref="TotaisPorPessoaResponseDto"/>
    /// </returns>
    public async Task<TotaisPorPessoaResponseDto> ObterTotaisPorPessoaAsync()
    {
        // Busca todas as pessoas junto com suas transações
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .AsNoTracking()
            .ToListAsync();

        // Para cada pessoa, calcula o total de receitas e despesas
        var itens = pessoas.Select(p => new TotalPorPessoaDto
        {
            Nome = p.Nome,

            // Soma apenas transações do tipo Receita
            TotalReceitas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor),

            // Soma apenas transações do tipo Despesa
            TotalDespesas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor)
        }).ToList();

        // Retorna o resumo geral somando todos os itens
        return new TotaisPorPessoaResponseDto
        {
            Itens = itens,
            TotalReceitas = itens.Sum(x => x.TotalReceitas),
            TotalDespesas = itens.Sum(x => x.TotalDespesas),
            SaldoGeral = itens.Sum(x => x.Saldo)
        };
    }

    /// <summary>
    /// Calcula os totais de receitas, despesas e saldo para cada categoria cadastrada,
    /// além de calcular o total geral de todas as categorias.
    /// </summary>
    public async Task<TotaisPorCategoriaResponseDto> ObterTotaisPorCategoriaAsync()
    {
        // Busca todas as categorias junto com suas transações
        var categorias = await _context.Categorias
            .Include(c => c.Transacoes)
            .AsNoTracking()
            .ToListAsync();

        // Para cada categoria, calcula o total de receitas e despesas
        var itens = categorias.Select(c => new TotalPorCategoriaDto
        {
            // Soma apenas transações do tipo Receita
            Descricao = c.Descricao,
            TotalReceitas = c.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor),

            // Soma apenas transações do tipo Despesa
            TotalDespesas = c.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor)
        }).ToList();

        // Retorna o resumo geral somando todos os itens
        return new TotaisPorCategoriaResponseDto
        {
            Itens = itens,
            TotalReceitas = itens.Sum(x => x.TotalReceitas),
            TotalDespesas = itens.Sum(x => x.TotalDespesas),
            SaldoGeral = itens.Sum(x => x.Saldo)
        };
    }
}
