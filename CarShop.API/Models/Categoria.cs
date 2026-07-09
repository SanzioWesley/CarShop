using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace CarShop.API.Models
{
    public class Categoria
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Nome { get; set; } = string.Empty;

        // Propriedade de navegação: Uma categoria tem muitos carros
        public virtual ICollection<Carro> Carros { get; set; } = new Collection<Carro>();
    }
}
