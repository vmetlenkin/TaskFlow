using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;

namespace WebAPI.Features.Authentication.Login;

using BCrypt.Net;

public record LoginQuery(
    string Email, 
    string Password) : IRequest<ErrorOr<LoginViewModel>>;

public record LoginViewModel(
    int Id, 
    string Email, 
    string FirstName, 
    string LastName, 
    string Token);

public class LoginQueryHandler : IRequestHandler<LoginQuery, ErrorOr<LoginViewModel>>
{
    private readonly IDatabaseContext _context;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IMapper _mapper;

    public LoginQueryHandler(IDatabaseContext context, IJwtTokenGenerator jwtTokenGenerator, IMapper mapper)
    {
        _context = context;
        _jwtTokenGenerator = jwtTokenGenerator;
        _mapper = mapper;
    }

    public async Task<ErrorOr<LoginViewModel>> Handle(LoginQuery request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (user is null || !BCrypt.Verify(request.Password, user.Password))
        {
            return Errors.Authentication.InvalidCredentials;
        }

        var token = _jwtTokenGenerator.GenerateToken(user);

        return _mapper.Map<LoginViewModel>((user, token));
    }
}