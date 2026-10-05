
using System.ComponentModel.DataAnnotations;

namespace CarShop.API.DTOs
{
    public class CriarCarroDto
    {
        [Required]
        public string Marca { get; set; } = string.Empty;
        [Required]
        public string Modelo { get; set; } = string.Empty;
        [Range(2024, 2026, ErrorMessage = "O ano deve estar entre 2024 e o ano atual.")]
        public int Ano { get; set; }
        [Range(1, 10000000)]
        public decimal Preco { get; set; }
        public string UrlImagem { get; set; } = string.Empty;
        public int CategoriaId { get; set; }
    }
}
