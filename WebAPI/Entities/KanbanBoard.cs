using Domain.Common;

namespace WebAPI.Entities;

public class KanbanBoard : BaseEntity
{
    public string Name { get; set; }
    public int ProjectId { get; set; }
    public IList<KanbanBoardColumn> KanbanBoardColumns { get; private set; } = new List<KanbanBoardColumn>();
}