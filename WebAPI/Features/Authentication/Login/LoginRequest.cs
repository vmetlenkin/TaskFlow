namespace WebAPI.Features.Authentication.Login;

public record LoginRequest(
    string Email, 
    string Password);