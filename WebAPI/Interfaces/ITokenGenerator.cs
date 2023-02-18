using WebAPI.Entities;

namespace WebAPI.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}