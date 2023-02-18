using ErrorOr;
using MediatR;
using WebAPI.Entities;
using WebAPI.Interfaces;

namespace WebAPI.Features.Projects.CreateProject;

public record CreateProjectCommand(
    int UserId,
    string Description,
    string Name) : IRequest<ErrorOr<CreateProjectViewModel>>;

public record CreateProjectViewModel(
    int Id,
    string Name,
    string Description,
    int UserId);

public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, ErrorOr<CreateProjectViewModel>>
{
    private readonly IDatabaseContext _context;

    public CreateProjectCommandHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<ErrorOr<CreateProjectViewModel>> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        var project = new Project
        {
            Name = request.Name,
            Description = request.Description,
            UserId = request.UserId
        };

        await _context.Projects.AddAsync(project, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        var board = new KanbanBoard
        {
            Name = "Default",
            ProjectId = project.Id
        };

        await _context.KanbanBoards.AddAsync(board, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        string[] columns = { "Запланировано", "В работе", "Тестируется", "Выполнено" };

        foreach (var name in columns)
        {
            var column = new KanbanBoardColumn
            {
                Name = name,
                KanbanBoardId = board.Id,
                Order = 0
            };
            
            await _context.KanbanBoardColumns.AddAsync(column, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return new CreateProjectViewModel(
            project.Id,
            project.Name,
            project.Description,
            project.UserId);
    }
}