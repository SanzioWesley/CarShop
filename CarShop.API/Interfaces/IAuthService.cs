using CarShop.API.DTOs;

namespace CarShop.API.Interfaces
{
    public interface IAuthService
    {
        Task<string?> Login(LoginDto model);
    }
}