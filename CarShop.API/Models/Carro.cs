using System.ComponentModel.DataAnnotations;

namespace CarShop.API.Models
{
    public class Carro
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Marca { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Modelo { get; set; } = string.Empty;

        public int Ano { get; set; }

        public decimal Preco { get; set; }

        public int Quilometragem { get; set; }

        public string Cor { get; set; } = string.Empty;

        public string UrlImagem { get; set; } = string.Empty;

        public DateTime DataCadastro { get; set; } = DateTime.Now;

        // Chave estrangeira
        public int CategoriaId { get; set; }

        // Propriedade de navegação: O carro pertence a uma categoria
        public virtual Categoria? Categoria { get; set; }
    }
}