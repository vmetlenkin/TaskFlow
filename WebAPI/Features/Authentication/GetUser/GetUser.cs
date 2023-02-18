using System.IdentityModel.Tokens.Jwt;
using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;
using WebAPI.Interfaces;

namespace WebAPI.Features.Authentication.GetUser;

public record GetUserQuery(
    string Token) : IRequest<ErrorOr<GetUserViewModel>>;

public record GetUserViewModel(
    User User, 
    string Token);

public class GetUserQueryHandler : IRequestHandler<GetUserQuery, ErrorOr<GetUserViewModel>>
{
    private readonly IDatabaseContext _context;

    public GetUserQueryHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<ErrorOr<GetUserViewModel>> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadToken(request.Token);
        var securityToken = jsonToken as JwtSecurityToken;
    
        var email = securityToken.Claims
            .First(claim => claim.Type == "email")
            .Value;

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);
    
        if (user is null)
        {
            return Errors.Authentication.UserNotFound;
        }

        return new GetUserViewModel(user, request.Token);
    }
}
