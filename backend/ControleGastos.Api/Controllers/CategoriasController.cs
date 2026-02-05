using ControleGastos.Api.Models;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly CategoriaService _service;

    public CategoriasController(CategoriaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
    {
        var categorias = await _service.ObterTodasAsync();
        return Ok(categorias);
    }

    [HttpPost]
    public async Task<ActionResult<Categoria>> CreateCategoria(CriarCategoriaDto dto)
    {
        try
        {
            var categoria = await _service.CriarAsync(dto);
            return CreatedAtAction(nameof(GetCategorias), new { id = categoria.Id }, categoria);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
