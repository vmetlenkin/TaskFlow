using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;
using WebAPI.Interfaces;

namespace WebAPI.Features.KanbanTasks.DeleteKanbanTask;

public record DeleteKanbanTaskCommand(
    int Id) : IRequest<ErrorOr<DeleteKanbanTaskViewModel>>;

public record DeleteKanbanTaskViewModel(
    int Id,
    string Title,
    string Text,
    int Order,
    int KanbanColumnId);

public class DeleteKanbanTaskHandler : IRequestHandler<DeleteKanbanTaskCommand, ErrorOr<DeleteKanbanTaskViewModel>>
{
    private readonly IDatabaseContext _context;

    public DeleteKanbanTaskHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<ErrorOr<DeleteKanbanTaskViewModel>> Handle(
        DeleteKanbanTaskCommand request, 
        CancellationToken cancellationToken)
    {
        var task = await _context.KanbanTasks
            .Include(t => t.KanbanBoardColumnTaskOrders)
            .FirstOrDefaultAsync(t => t.Id == request.Id, 
                cancellationToken);

        if (task is null)
        {
            return Errors.Kanban.KanbanTaskNotFound;
        }

        var column = await _context.KanbanBoardColumns
            .FirstOrDefaultAsync(c => c.Id == task.KanbanBoardColumnTaskOrders.KanbanBoardColumnId, 
                cancellationToken);

        if (column is null)
        {
            return Errors.Kanban.KanbanColumnNotFound;
        }

        _context.KanbanTasks.Remove(task);
        
        MovePositions(task.KanbanBoardColumnTaskOrders.Order, column.KanbanBoardColumnTaskOrders);
        
        await _context.SaveChangesAsync(cancellationToken);
        
        return new DeleteKanbanTaskViewModel(
            task.Id,
            task.Title,
            task.Description,
            task.KanbanBoardColumnTaskOrders.Order,
            task.KanbanBoardColumnTaskOrders.KanbanBoardColumnId);
    }
    
    private void MovePositions(
        int position,
        IEnumerable<KanbanBoardColumnTaskOrder> columnTaskOrder)
    {
        foreach (var taskOrder in columnTaskOrder)
        {
            if (taskOrder.Order > position)
            {
                taskOrder.Order--;
            }
        }
    }
}