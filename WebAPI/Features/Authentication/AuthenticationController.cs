using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Common;
using WebAPI.Features.Authentication.DTO;
using WebAPI.Features.Authentication.GetUser;
using WebAPI.Features.Authentication.Login;
using WebAPI.Features.Authentication.Register;

namespace WebAPI.Features.Authentication;

[Route("authentication")]
[AllowAnonymous]
public class AuthenticationController : ApiController
{
    private readonly ISender _mediator;
    private readonly IMapper _mapper;

    public AuthenticationController(ISender mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var query = _mapper.Map<LoginQuery>(request);
        var result = await _mediator.Send(query);

        return result.Match(
            response => Ok(response),
            errors => Problem(errors));
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var command = _mapper.Map<RegisterCommand>(request);
        var result = await _mediator.Send(command);

        return result.Match(
            response => Ok(_mapper.Map<RegisterResponse>(response)),
            errors => Problem(errors));
    }

    [HttpGet("user")]
    public async Task<IActionResult> GetUser([FromQuery] string token)
    {
        var query = new GetUserQuery(token);
        var result = await _mediator.Send(query);

        return result.Match(
            response => Ok(_mapper.Map<GetUserResponse>(response)),
            errors => Problem(errors));
    }
}