using ControleGastos.Api.Models;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

/// <summary>
/// Controller responsável por expor endpoints de consulta
/// de totais financeiros do sistema.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TotaisController : ControllerBase
{
    private readonly TotaisService _service;

    /// <summary>
    /// Construtor com injeção do TotaisService.
    /// </summary>
    public TotaisController(TotaisService service)
    {
        _service = service;
    }

    /// <summary>
    /// Retorna o resumo financeiro por pessoa
    /// </summary>
    [HttpGet("por-pessoa")]
    public async Task<ActionResult<TotaisPorPessoaResponseDto>> GetTotaisPorPessoa()
    {
        var result = await _service.ObterTotaisPorPessoaAsync();
        return Ok(result);
    }

    /// <summary>
    /// Retorna o resumo financeiro por categoria
    /// </summary>
    [HttpGet("por-categoria")]
    public async Task<ActionResult<TotaisPorCategoriaResponseDto>> GetTotaisPorCategoria()
    {
        var result = await _service.ObterTotaisPorCategoriaAsync();
        return Ok(result);
    }
}
