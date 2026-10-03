using CarShop.API.DTOs;
using CarShop.API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly UserManager<IdentityUser> _userManager;

    public AuthController(
        IAuthService authService,
        UserManager<IdentityUser> userManager)
    {
        _authService = authService;
        _userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto model)
    {
        var token = await _authService.Login(model);

        if (token == null)
        {
            return Unauthorized("Email ou senha inválidos");
        }

        return Ok(new { token });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(LoginDto model)
    {
        var user = new IdentityUser
        {
            UserName = model.Email,
            Email = model.Email
        };

        var result = await _userManager.CreateAsync(
            user,
            model.Password
        );

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        // Todo cadastro público começa como Cliente
        var roleResult = await _userManager.AddToRoleAsync(
            user,
            "Cliente"
        );

        if (!roleResult.Succeeded)
        {
            return BadRequest(roleResult.Errors);
        }

        return Ok("Usuário criado");
    }
}