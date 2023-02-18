using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Common;
using WebAPI.Features.KanbanBoards.GetKanbanBoard;

namespace WebAPI.Features.KanbanBoards;

[Route("boards")]
[AllowAnonymous]
public class KanbanBoardController : ApiController
{
    private readonly IMediator _mediator;

    public KanbanBoardController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        var query = new GetKanbanBoardQuery(id);
        var result = await _mediator.Send(query);

        return result.Match(
            response => Ok(response),
            errors => Problem(errors));
    }
}