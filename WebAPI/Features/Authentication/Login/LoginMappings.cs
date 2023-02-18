using Mapster;
using WebAPI.Entities;

namespace WebAPI.Features.Authentication.Login;

public class LoginMappings : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<LoginRequest, LoginQuery>();
         
        config.NewConfig<(User, string),LoginViewModel>()
            .Map(dest => dest, src => src.Item1)
            .Map(dest => dest.Token, src => src.Item2);
    }
}