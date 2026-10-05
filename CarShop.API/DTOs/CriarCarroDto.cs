namespace CarShop.API.DTOs
{
    public class CriarCarroDto
    {
        public string Marca { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public int Ano { get; set; }
        public decimal Preco { get; set; }
        public string UrlImagem { get; set; } = string.Empty;
        public int CategoriaId { get; set; }
    }
}
