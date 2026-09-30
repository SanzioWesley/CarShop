using CarShop.API.DTOs;
using CarShop.API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CarShop.API.Services
{
    public class AuthService : IAuthService
    {
        // Gerencia os usuários cadastrados pelo ASP.NET Identity.
        private readonly UserManager<IdentityUser> _userManager;

        // Permite acessar configurações do appsettings.json.
        private readonly IConfiguration _configuration;


        // As dependências são recebidas pelo construtor.
        public AuthService(
            UserManager<IdentityUser> userManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }


        public async Task<string?> Login(LoginDto model)
        {
            // Procura o usuário pelo e-mail informado no login.
            var user = await _userManager.FindByEmailAsync(model.Email);

            // Se não encontrou o usuário, o login falhou.
            if (user == null)
            {
                return null;
            }


            // Verifica se a senha informada pertence ao usuário.
            var passwordValid = await _userManager.CheckPasswordAsync(
                user,
                model.Password
            );

            // Se a senha estiver errada, o login falhou.
            if (!passwordValid)
            {
                return null;
            }


            // Busca a chave secreta configurada no appsettings.json.
            var jwtKey = _configuration["Jwt:Key"];


            // Converte a chave de texto para bytes e cria
            // a chave que será usada na assinatura do JWT.
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey!)
            );


            // Define a chave e o algoritmo usados para assinar o token.
            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );


            // Informações que serão armazenadas dentro do token.
            var claims = new[]
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    user.Id
                ),

                new Claim(
                    ClaimTypes.Email,
                    user.Email!
                )
            };


            // Cria o JWT.
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );


            // Transforma o objeto JwtSecurityToken em uma string JWT
            // que poderá ser devolvida para o cliente.
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}