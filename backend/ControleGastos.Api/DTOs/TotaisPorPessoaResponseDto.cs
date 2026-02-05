public class TotaisPorPessoaResponseDto
{
    public List<TotalPorPessoaDto> Itens { get; set; } = new();
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal SaldoGeral { get; set; }
}
