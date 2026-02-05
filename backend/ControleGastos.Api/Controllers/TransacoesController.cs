using ControleGastos.Api.Models;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly TransacaoService _service;

    public TransacoesController(TransacaoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransacaoResponseDto>>> GetTransacoes()
    {
        var transacoes = await _service.ObterTodasAsync();
        return Ok(transacoes);
    }

    [HttpPost]
    public async Task<ActionResult<TransacaoResponseDto>> CreateTransacao(CriarTransacaoDto dto)
    {
        try
        {
            var response = await _service.CriarAsync(dto);
            return CreatedAtAction(nameof(GetTransacoes), new { id = response.Id }, response);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
