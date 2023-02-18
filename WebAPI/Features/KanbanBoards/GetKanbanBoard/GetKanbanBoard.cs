using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;

namespace WebAPI.Features.KanbanBoards.GetKanbanBoard;

public record GetKanbanBoardQuery(int Id) : IRequest<ErrorOr<GetKanbanBoardViewModel>>;

public record GetKanbanBoardViewModel
{
    public KanbanBoardViewModel Board { get; set; }
};

public record KanbanBoardViewModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public IEnumerable<KanbanColumnViewModel> Columns { get; set; }
}

public record KanbanColumnViewModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public IEnumerable<KanbanTaskViewModel> Tasks { get; set; }
}

public record KanbanTaskViewModel
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int KanbanColumnId { get; set; }
}

public class GetKanbanBoardQueryHandler : IRequestHandler<GetKanbanBoardQuery, ErrorOr<GetKanbanBoardViewModel>>
{
    private readonly IDatabaseContext _context;

    public GetKanbanBoardQueryHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<ErrorOr<GetKanbanBoardViewModel>> Handle(
        GetKanbanBoardQuery request, 
        CancellationToken cancellationToken)
    {
        var boardViewModel = await _context.KanbanBoards
            .Select(b => new KanbanBoardViewModel
            {
                Id = b.Id,
                Name = b.Name,
                Columns = b.KanbanBoardColumns.OrderBy(c => c.Order)
                    .Select(c => new KanbanColumnViewModel
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Tasks = c.KanbanBoardColumnTaskOrders.OrderBy(t => t.Order)
                            .Select(t => new KanbanTaskViewModel
                            {
                                Id = t.KanbanTaskId,
                                Title = t.KanbanTask.Title,
                                Description = t.KanbanTask.Description,
                                KanbanColumnId = t.KanbanBoardColumnId
                            })
                    })
            }).FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);

        if (boardViewModel is null)
        {
            return Errors.Kanban.KanbanBoardNotFound;
        }
        
        return new GetKanbanBoardViewModel
        {
            Board = boardViewModel
        };
    }
}
    