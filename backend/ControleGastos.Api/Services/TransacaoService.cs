using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services;

/// <summary>
/// Service responsável pelas regras de negócio relacionadas as transações.
/// </summary>
public class TransacaoService
{
    private readonly AppDbContext _context;

    /// <summary>
    /// Construtor com injeção de dependência do DbContext.
    /// </summary>
    public TransacaoService(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Busca e retorna todas as transações
    /// </summary>
    /// /// <returns>
    /// Um objeto <see cref="TransacaoResponseDto"/>
    /// </returns>
    public async Task<List<TransacaoResponseDto>> ObterTodasAsync()
    {
        return await _context.Transacoes
            .Include(t => t.Pessoa)
            .Include(t => t.Categoria)
            .AsNoTracking()
            .Select(t => new TransacaoResponseDto
            {
                Id = t.Id,
                Descricao = t.Descricao,
                Valor = t.Valor,
                Tipo = t.Tipo,

                PessoaId = t.PessoaId,
                PessoaNome = t.Pessoa.Nome,

                CategoriaId = t.CategoriaId,
                CategoriaDescricao = t.Categoria.Descricao
            })
            .ToListAsync();
    }

    public async Task<TransacaoResponseDto> CriarAsync(CriarTransacaoDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Descricao))
            throw new ArgumentException("A descrição é obrigatória.");

        if (dto.Descricao.Length > 400)
            throw new ArgumentException("A descrição deve ter no máximo 400 caracteres.");

        if (dto.Valor <= 0)
            throw new ArgumentException("O valor deve ser positivo.");

        if (!Enum.IsDefined(typeof(TipoTransacao), dto.Tipo))
            throw new ArgumentException("Tipo de transação inválido.");

        var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId)
            ?? throw new ArgumentException("Pessoa informada não existe.");

        var categoria = await _context.Categorias.FindAsync(dto.CategoriaId)
            ?? throw new ArgumentException("Categoria informada não existe.");

        if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
            throw new ArgumentException("Menores de idade só podem registrar despesas.");

        if (dto.Tipo == TipoTransacao.Despesa && categoria.Finalidade == FinalidadeCategoria.Receita)
            throw new ArgumentException("Categoria não compatível com despesa.");

        if (dto.Tipo == TipoTransacao.Receita && categoria.Finalidade == FinalidadeCategoria.Despesa)
            throw new ArgumentException("Categoria não compatível com receita.");

        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId,
            CategoriaId = dto.CategoriaId
        };

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return new TransacaoResponseDto
        {
            Id = transacao.Id,
            Descricao = transacao.Descricao,
            Valor = transacao.Valor,
            Tipo = transacao.Tipo,
            PessoaId = pessoa.Id,
            PessoaNome = pessoa.Nome,
            CategoriaId = categoria.Id,
            CategoriaDescricao = categoria.Descricao
        };
    }
}
