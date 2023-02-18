using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;
using WebAPI.Interfaces;

namespace WebAPI.Features.KanbanTasks.CreateKanbanTask;

public record CreateKanbanTaskCommand(
    int KanbanColumnId,
    string Title,
    string Text) : IRequest<ErrorOr<CreateKanbanTaskViewModel>>;

public record CreateKanbanTaskViewModel(
    int Id,
    int KanbanColumnId,
    string Title,
    string Text);

public class CreateKanbanTaskHandler : IRequestHandler<CreateKanbanTaskCommand, ErrorOr<CreateKanbanTaskViewModel>>
{
    private readonly IDatabaseContext _context;

    public CreateKanbanTaskHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<ErrorOr<CreateKanbanTaskViewModel>> Handle(
        CreateKanbanTaskCommand request, 
        CancellationToken cancellationToken)
    {
        var column = await _context
            .KanbanBoardColumns
            .Include(c => c.KanbanBoardColumnTaskOrders)
            .FirstOrDefaultAsync(p => p.Id == request.KanbanColumnId, 
                cancellationToken: cancellationToken);
        
        if (column is null)
        {
            return Errors.Kanban.KanbanColumnNotFound;
        }

        var task = new KanbanTask
        {
            Title = request.Title,
            Description = request.Text,
            KanbanBoardColumnTaskOrders = new KanbanBoardColumnTaskOrder
            {
                KanbanBoardColumnId = request.KanbanColumnId,
                Order = column.KanbanBoardColumnTaskOrders.Count()
            }
        };

        _context.KanbanTasks.Add(task);
        
        await _context.SaveChangesAsync(cancellationToken);
        task.KanbanBoardColumnTaskOrders.KanbanTaskId = task.Id;

        return new CreateKanbanTaskViewModel(
            task.Id,
            task.KanbanBoardColumnTaskOrders.KanbanBoardColumnId,
            task.Title,
            task.Description);
    }
}