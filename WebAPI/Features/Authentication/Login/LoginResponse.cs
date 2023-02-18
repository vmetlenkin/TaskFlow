namespace WebAPI.Features.Authentication.Login;

public record LoginResponse(
    string Id,
    string Email,
    string FirstName,
    string LastName,
    string Token);