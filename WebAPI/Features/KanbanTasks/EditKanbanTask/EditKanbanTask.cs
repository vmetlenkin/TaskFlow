using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;

namespace WebAPI.Features.KanbanTasks.EditKanbanTask;

public record EditKanbanTaskCommand(
    int Id, 
    string Title, 
    string Text) : IRequest<ErrorOr<EditKanbanTaskViewModel>>;

public record EditKanbanTaskViewModel(
    int Id,
    string Title,
    string Text,
    int Order,
    int KanbanColumnId);

public class EditKanbanTaskHandler : IRequestHandler<EditKanbanTaskCommand, ErrorOr<EditKanbanTaskViewModel>>
{
    private readonly IDatabaseContext _context;

    public EditKanbanTaskHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<ErrorOr<EditKanbanTaskViewModel>> Handle(
        EditKanbanTaskCommand request, 
        CancellationToken cancellationToken)
    {
        var task = await _context.KanbanTasks
            .Include(t => t.KanbanBoardColumnTaskOrders)
            .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

        if (task is null)
        {
            return Errors.Kanban.KanbanTaskNotFound;
        }

        task.Title = request.Title;
        task.Description = request.Text;

        await _context.SaveChangesAsync(cancellationToken);
        
        return new EditKanbanTaskViewModel(
            task.Id,
            task.Title,
            task.Description,
            task.KanbanBoardColumnTaskOrders.Order,
            task.KanbanBoardColumnTaskOrders.KanbanBoardColumnId);
    }
}