using Domain.Common;

namespace WebAPI.Entities;

public class KanbanBoardColumnTaskOrder : BaseEntity
{
    public int KanbanTaskId { get; set; }
    public int KanbanBoardColumnId { get; set; }
    public KanbanBoardColumn KanbanBoardColumn { get; set; }
    public KanbanTask KanbanTask { get; set; }
    public int Order { get; set; }
}