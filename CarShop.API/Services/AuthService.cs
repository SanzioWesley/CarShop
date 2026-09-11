using CarShop.API.DTOs;
using CarShop.API.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace CarShop.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AuthService(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<string?> Login(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return null;
            }

            var passwordValid = await _userManager.CheckPasswordAsync(
                user,
                model.Password
            );

            if (!passwordValid)
            {
                return null;
            }

            return "Login válido";
        }
    }
}