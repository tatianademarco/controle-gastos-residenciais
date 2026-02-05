using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services;

/// <summary>
/// Service que centraliza todas as regras de negócio relacionadas ao cadastro de pessoas.
/// </summary>
public class PessoaService
{
    private readonly AppDbContext _context;

    /// <summary>
    /// Construtor com injeção de dependência do DbContext.
    /// </summary>
    public PessoaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Pessoa>> ListarAsync()
    {
        return await _context.Pessoas
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Pessoa?> BuscarPorIdAsync(int id)
    {
        return await _context.Pessoas.FindAsync(id);
    }

    public async Task<Pessoa> CriarAsync(Pessoa pessoa)
    {
        if (string.IsNullOrWhiteSpace(pessoa.Nome))
            throw new ArgumentException("O nome é obrigatório.");

        if (pessoa.Nome.Length > 200)
            throw new ArgumentException("O nome deve ter no máximo 200 caracteres.");

        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return pessoa;
    }

    public async Task AtualizarAsync(int id, CriarPessoaDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nome))
            throw new ArgumentException("O nome é obrigatório.");

        var pessoa = await _context.Pessoas.FindAsync(id);
        if (pessoa == null)
            throw new KeyNotFoundException("Pessoa não encontrada.");

        pessoa.Nome = dto.Nome;
        pessoa.Idade = dto.Idade;

        await _context.SaveChangesAsync();
    }

    public async Task DeletarAsync(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);
        if (pessoa == null)
            throw new KeyNotFoundException("Pessoa não encontrada.");

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();
    }
}
