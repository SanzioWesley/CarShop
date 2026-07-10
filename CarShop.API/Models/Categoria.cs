using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarShop.API.Models
{
    public class Categoria
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome da categoria e obrigatório.")]
        [MinLength(3, ErrorMessage = "O nome debe ter no mínimo 3 caracteres.")]
        public string Nome { get; set; } = string.Empty;

        [JsonIgnore] 
        public virtual ICollection<Carro> Carros { get; set; } = new Collection<Carro>();
    }
}
