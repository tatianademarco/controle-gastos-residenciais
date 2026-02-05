using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services;

/// <summary>
/// Service responsável por todas as regras de negócio relacionadas a categorias.
/// </summary>
public class CategoriaService
{
    private readonly AppDbContext _context;

    /// <summary>
    /// Construtor com injeção de dependência do DbContext.
    /// </summary>
    public CategoriaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Categoria>> ObterTodasAsync()
    {
        return await _context.Categorias
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Categoria> CriarAsync(CriarCategoriaDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Descricao))
            throw new ArgumentException("A descrição é obrigatória.");

        if (dto.Descricao.Length > 400)
            throw new ArgumentException("A descrição deve ter no máximo 400 caracteres.");

        if (!Enum.IsDefined(typeof(FinalidadeCategoria), dto.Finalidade))
            throw new ArgumentException("Finalidade inválida. Use: Despesa, Receita ou Ambas.");

        var categoria = new Categoria
        {
            Descricao = dto.Descricao,
            Finalidade = dto.Finalidade
        };

        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();

        return categoria;
    }
}
