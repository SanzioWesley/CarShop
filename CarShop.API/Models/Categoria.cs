using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarShop.API.Models
{
    public class Categoria
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Nome { get; set; } = string.Empty;

        [JsonIgnore] // Isso aqui faz o Swagger parar de pedir a lista de carros no POST
        public virtual ICollection<Carro> Carros { get; set; } = new Collection<Carro>();
    }
}
