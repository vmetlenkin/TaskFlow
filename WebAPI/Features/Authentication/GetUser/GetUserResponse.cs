namespace WebAPI.Features.Authentication.GetUser;

public record GetUserResponse(
    int Id,
    string Email,
    string FirstName,
    string LastName,
    string Token);