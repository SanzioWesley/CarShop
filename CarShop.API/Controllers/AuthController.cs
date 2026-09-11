using CarShop.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using CarShop.API.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto model)
    {
        var result = await _authService.Login(model);

        return Ok(result);
    }
}