public class TotaisPorCategoriaResponseDto
{
    public List<TotalPorCategoriaDto> Itens { get; set; } = new();
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal SaldoGeral { get; set; }
}
