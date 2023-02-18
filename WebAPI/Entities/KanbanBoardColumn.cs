using Domain.Common;

namespace WebAPI.Entities;

public class KanbanBoardColumn : BaseEntity
{
    public string Name { get; set; }
    public int KanbanBoardId { get; set; }
    public int Order { get; set; }
    public IEnumerable<KanbanBoardColumnTaskOrder> KanbanBoardColumnTaskOrders { get; private set; } = new List<KanbanBoardColumnTaskOrder>();
}