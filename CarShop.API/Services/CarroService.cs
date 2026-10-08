using CarShop.API.Data;
using CarShop.API.DTOs;
using CarShop.API.Models;

public class CarroService
{
    private readonly AppDbContext _context;

    public CarroService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Carro> Criar(CriarCarroDto dto)
    {
        var carro = new Carro
        {
            Marca = dto.Marca,
            Modelo = dto.Modelo,
            Ano = dto.Ano,
            Preco = dto.Preco,
            UrlImagem = dto.UrlImagem,
            CategoriaId = dto.CategoriaId
        };

        _context.Carros.Add(carro);

        await _context.SaveChangesAsync();

        return carro;
    }

    public async Task<Carro?> Atualizar(int id, Carro carro)
    {
        var carroExistente = await _context.Carros.FindAsync(id);

        if (carroExistente == null)
        {
            return null;
        }

        carroExistente.Marca = carro.Marca;
        carroExistente.Modelo = carro.Modelo;
        carroExistente.Ano = carro.Ano;
        carroExistente.Preco = carro.Preco;
        carroExistente.UrlImagem = carro.UrlImagem;
        carroExistente.CategoriaId = carro.CategoriaId;

        await _context.SaveChangesAsync();

        return carroExistente;
    }
}