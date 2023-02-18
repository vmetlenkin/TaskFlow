using Domain.Common;

namespace WebAPI.Entities;

public class Project : BaseEntity
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public int UserId { get; set; }
    public IEnumerable<KanbanBoard> Boards { get; private set; } = new List<KanbanBoard>();
}