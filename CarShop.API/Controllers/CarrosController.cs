using CarShop.API.Data;
using CarShop.API.DTOs;
using CarShop.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarShop.API.Controllers
{
    //locahost:xxxx/api/Carros
    [ApiController]
    [Route("api/[controller]")]
    public class CarrosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly CarroService _carroService;

        public CarrosController(AppDbContext context, CarroService carroService)
        {
            _context = context;
            _carroService = carroService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carro>>> Get()
        {
            var carros = await _context.Carros.ToListAsync();

            return Ok(carros);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Carro>> GetById(int id)
        {
            var carro = await _context.Carros.FindAsync(id);

            if (carro == null)
            {
                return NotFound();
            }

            return Ok(carro);
        }

        [Authorize(Roles = "Gerente")]
        [HttpPost]
        public async Task<ActionResult<Carro>> Post(CriarCarroDto dto)
        {
            var carro = await _carroService.Criar(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = carro.Id },
                carro
            );
        }


        [Authorize(Roles = "Gerente")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Carro carro)
        {
            var carroAtualizado = await _carroService.Atualizar(id, carro);

            if (carroAtualizado == null)
            {
                return NotFound();
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarro(int id)
        {
            var carro = await _context.Carros.FindAsync(id);
            if (carro == null)
            {
                return NotFound();
            }

            _context.Carros.Remove(carro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }

}
