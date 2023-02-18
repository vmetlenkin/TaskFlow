using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;

namespace WebAPI.Interfaces;

public interface IDatabaseContext
{
    DbSet<Project> Projects { get; }
    DbSet<User> Users { get; }
    DbSet<KanbanBoard> KanbanBoards { get; }
    DbSet<KanbanBoardColumn> KanbanBoardColumns { get; }
    DbSet<KanbanTask> KanbanTasks { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}