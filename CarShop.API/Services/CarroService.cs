using CarShop.API.Data;
using CarShop.API.DTOs;
using CarShop.API.Models;
using CarShop.API.Services;

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

    public async Task<bool> Excluir(int id)
    {
       var carro = await _context.Carros.FindAsync(id);

        if (carro == null)
        {
            return false;
        }

        _context.Carros.Remove(carro);

        await _context.SaveChangesAsync();

        return true;

    }

    public async Task<ResultadoAtualizacao> Atualizar(int id, AtualizarCarroDto dto)
    {
        var carroExistente = await _context.Carros.FindAsync(id);

        if (carroExistente == null)
        {
            return ResultadoAtualizacao.CarroNaoEncontrado;
        }
        var categoria = await _context.Categorias.FindAsync(dto.CategoriaId);

        if (categoria == null)
        {
            return ResultadoAtualizacao.CategoriaInvalida;
        }

        carroExistente.Marca = dto.Marca;
        carroExistente.Modelo = dto.Modelo;
        carroExistente.Ano = dto.Ano;
        carroExistente.Preco = dto.Preco;
        carroExistente.UrlImagem = dto.UrlImagem;
        carroExistente.CategoriaId = dto.CategoriaId;

        await _context.SaveChangesAsync();

        return ResultadoAtualizacao.Sucesso;
    }
}