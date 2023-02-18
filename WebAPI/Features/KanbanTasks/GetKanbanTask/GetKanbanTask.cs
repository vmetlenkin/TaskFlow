using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;

namespace WebAPI.Features.KanbanTasks.GetKanbanTask;

public record GetKanbanTaskQuery(int Id) : IRequest<ErrorOr<GetKanbanTaskViewModel>>;

public class GetKanbanTaskHandler : IRequestHandler<GetKanbanTaskQuery, ErrorOr<GetKanbanTaskViewModel>>
{
    private readonly IDatabaseContext _context;

    public GetKanbanTaskHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<ErrorOr<GetKanbanTaskViewModel>> Handle(
        GetKanbanTaskQuery request, 
        CancellationToken cancellationToken)
    {
        var task = await _context.KanbanTasks
            .Include(t => t.KanbanBoardColumnTaskOrders)
            .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

        if (task is null)
        {
            return Errors.Kanban.KanbanTaskNotFound;
        }

        return new GetKanbanTaskViewModel(
            task.Id,
            task.Title,
            task.Description,
            task.KanbanBoardColumnTaskOrders.Order,
            task.KanbanBoardColumnTaskOrders.KanbanBoardColumnId);
    }
}

public record GetKanbanTaskViewModel(
    int Id,
    string Title,
    string Text,
    int Order,
    int KanbanColumnId);