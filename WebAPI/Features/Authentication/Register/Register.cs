using ErrorOr;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;
using WebAPI.Features.Authentication.DTO;
using WebAPI.Interfaces;

namespace WebAPI.Features.Authentication.Register;

using BCrypt.Net;

public class RegisterMappings : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<RegisterRequest, RegisterCommand>();
         
        config.NewConfig<RegisterViewModel, RegisterResponse>()
            .Map(dest => dest, src => src.User)
            .Map(dest => dest.Token, src => src.Token);
    }
}

public record RegisterCommand(
    string Email,
    string FirstName,
    string LastName,
    string Password) : IRequest<ErrorOr<RegisterViewModel>>;

public record RegisterViewModel(
    User User, 
    string Token);

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ErrorOr<RegisterViewModel>>
{
    private readonly IDatabaseContext _context;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public RegisterCommandHandler(IDatabaseContext context, IJwtTokenGenerator jwtTokenGenerator)
    {
        _context = context;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<ErrorOr<RegisterViewModel>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken: cancellationToken);

        if (existingUser is not null)
        {
            return Errors.Authentication.DuplicateEmail;
        }

        var passwordHash = BCrypt.HashPassword(request.Password);

        var user = new User
        {
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Password = passwordHash
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync(cancellationToken);

        var token = _jwtTokenGenerator.GenerateToken(user);

        return new RegisterViewModel(user, token);
    }
}