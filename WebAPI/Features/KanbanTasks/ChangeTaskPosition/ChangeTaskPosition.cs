using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;
using WebAPI.Interfaces;

namespace WebAPI.Features.KanbanTasks.ChangeTaskPosition;

public record ChangeTaskPositionCommand(
    int Id,
    int SourceColumnId,
    int DestinationColumnId,
    int SourcePosition,
    int DestinationPosition) : IRequest<ErrorOr<ChangeTaskPositionViewModel>>;

public record ChangeTaskPositionViewModel(
    int Id,
    int SourceColumnId,
    int DestinationColumnId,
    int DestinationPosition);

public class ChangeTaskPositionHandler : IRequestHandler<ChangeTaskPositionCommand, ErrorOr<ChangeTaskPositionViewModel>>
{
    private readonly IDatabaseContext _context;

    public ChangeTaskPositionHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<ErrorOr<ChangeTaskPositionViewModel>> Handle(
        ChangeTaskPositionCommand request, 
        CancellationToken cancellationToken)
    {
        var task = await _context.KanbanTasks
            .Include(t => t.KanbanBoardColumnTaskOrders)
            .ThenInclude(c => c.KanbanBoardColumn)
            .FirstOrDefaultAsync(t => t.Id == request.Id, 
                cancellationToken: cancellationToken);

        if (task is null)
        {
            return Errors.Kanban.KanbanTaskNotFound;
        }
        
        var sourceColumn = await _context.KanbanBoardColumns
            .Include(c => c.KanbanBoardColumnTaskOrders)
            .FirstOrDefaultAsync(c => c.Id == request.SourceColumnId, 
                cancellationToken: cancellationToken);

        var destinationColumn = await _context.KanbanBoardColumns
            .Include(c => c.KanbanBoardColumnTaskOrders)
            .FirstOrDefaultAsync(c => c.Id == request.DestinationColumnId, 
                cancellationToken: cancellationToken);
        
        if (sourceColumn is null || destinationColumn is null)
        {
            return Errors.Kanban.KanbanColumnNotFound;
        }
        
        ChangeTaskPosition(
            sourceColumn.KanbanBoardColumnTaskOrders, 
            destinationColumn.KanbanBoardColumnTaskOrders,
            request.SourcePosition,
            request.DestinationPosition);
        
        task.KanbanBoardColumnTaskOrders.Order = request.DestinationPosition;
        task.KanbanBoardColumnTaskOrders.KanbanBoardColumnId = destinationColumn.Id;
        
        await _context.SaveChangesAsync(cancellationToken);

        return new ChangeTaskPositionViewModel(
            task.Id,
            sourceColumn.Id,
            destinationColumn.Id,
            request.DestinationPosition);
    }
    
    private void ChangeTaskPosition(
        IEnumerable<KanbanBoardColumnTaskOrder> sourceColumnTaskOrder, 
        IEnumerable<KanbanBoardColumnTaskOrder> targetColumnTaskOrder,
        int sourcePosition,
        int targetPosition)
    {
        foreach (var taskOrder in sourceColumnTaskOrder)
        {
            if (taskOrder.Order > sourcePosition)
            {
                taskOrder.Order--;
            }
        }
        
        foreach (var taskOrder in targetColumnTaskOrder)
        {
            if (taskOrder.Order >= targetPosition)
            {
                taskOrder.Order++;
            }
        }
    }
}