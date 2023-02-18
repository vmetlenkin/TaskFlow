namespace WebAPI.Features.Authentication.DTO;

public record RegisterResponse(
    int Id,
    string Email,
    string FirstName,
    string LastName,
    string Token);