using CarShop.API.Data;
using CarShop.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly AppDbContext _context;

    // Construtor: Peça o AppDbContext aqui
    public CategoriasController(AppDbContext context)
    {
        _context = context;
    }
    private int GetUserId() =>
        int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

    // Crie o método GET aqui
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Categoria>>> Get()

    {
        var categorias = await _context.Categorias.ToListAsync();
        return Ok(categorias);
    }

    // Crie o método POST aqui
    [HttpPost]
    public async Task<ActionResult> Post(Categoria categoria)
    {
        //var categorias = await _taskService.CreateAsync(GetUserId());
        //return CreatedAtAction(nameof(GetTask), new {id = Task.Id }, task);

        // 1. Adiciona a categoria que veio lá do Swagger (parâmetro)
        _context.Categorias.Add(categoria);

        // 2. Salva as mudanças no banco de forma assíncrona
        await _context.SaveChangesAsync();

        // 3. Retorna um status 201 (Created) e mostra o objeto que foi criado
        return CreatedAtAction(nameof(Get), new { id = categoria.Id }, categoria);
    }
}