using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Common;
using WebAPI.Features.Projects.CreateProject;
using WebAPI.Features.Projects.GetProject;
using WebAPI.Features.Projects.GetProjects;

namespace WebAPI.Features.Projects;
[Route("projects")]
[AllowAnonymous]
public class ProjectController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public ProjectController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectCommand request)
    {
        var command = _mapper.Map<CreateProjectCommand>(request);
        var result = await _mediator.Send(command);

        return result.Match(
            response => Ok(response),
            errors => Problem(errors));
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProject(int id)
    {
        var query = new GetProjectQuery(id);
        var result = await _mediator.Send(query);

        return result.Match(
            response => Ok(response),
            errors => Problem(errors));
    }
    
    [HttpGet]
    public async Task<IActionResult> GetProjects([FromQuery] int? userId)
    {
        var query = new GetProjectsQuery(userId);

        return Ok(await _mediator.Send(query));
    }
}