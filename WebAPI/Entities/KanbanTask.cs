using Domain.Common;

namespace WebAPI.Entities;

public class KanbanTask : BaseEntity
{
    public string Title { get; set; }
    public string Description { get; set; }
    public KanbanBoardColumnTaskOrder KanbanBoardColumnTaskOrders { get; set; }
}

