using Mapster;

namespace WebAPI.Features.Authentication.GetUser;

public class GetUserMappings : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<GetUserViewModel, GetUserResponse>()
            .Map(dest => dest, src => src.User)
            .Map(dest => dest.Token, src => src.Token);
    }
}