using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Common;
using WebAPI.Features.KanbanTasks.ChangeTaskPosition;
using WebAPI.Features.KanbanTasks.CreateKanbanTask;
using WebAPI.Features.KanbanTasks.DeleteKanbanTask;
using WebAPI.Features.KanbanTasks.EditKanbanTask;
using WebAPI.Features.KanbanTasks.GetKanbanTask;

namespace WebAPI.Features.KanbanTasks;

[Route("tasks")]
[AllowAnonymous]
public class KanbanTaskController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public KanbanTaskController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetTaskById(int id)
    {
        var query = new GetKanbanTaskQuery(id);
        var result = await _mediator.Send(query);

        return result.Match(
            response => Ok(response),
            errors => Problem(errors));
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] CreateKanbanTaskCommand command)
    {
        var result = await _mediator.Send(command);
        
        return result.Match(
            response => Ok(response),
            errors => Problem(errors));
    }
    
    [HttpPatch]
    public async Task<IActionResult> CreateTask([FromBody] EditKanbanTaskCommand command)
    {
        var result = await _mediator.Send(command);
        
        return result.Match(
            response => Ok(response),
            errors => Problem(errors));
    }
    
    [HttpPatch("change_position")]
    public async Task<IActionResult> ChangeTaskPosition([FromBody] ChangeTaskPositionCommand command)
    {
        var result = await _mediator.Send(command);
        
        return result.Match(
            response => Ok(response),
            errors => Problem(errors));
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteKanbanTask(int id)
    {
        var command = new DeleteKanbanTaskCommand(id);
        var result = await _mediator.Send(command);
        
        return result.Match(
            response => Ok(response),
            errors => Problem(errors));
    }
}