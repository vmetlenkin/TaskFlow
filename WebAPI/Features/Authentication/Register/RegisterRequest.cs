namespace WebAPI.Features.Authentication.DTO;

public record RegisterRequest(
    string Email, 
    string FirstName, 
    string LastName, 
    string Password);