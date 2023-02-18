using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;
using WebAPI.Interfaces;

namespace WebAPI.Features.Projects.GetProject;

public record GetProjectQuery(int Id) : IRequest<ErrorOr<GetProjectViewModel>>;

public class  GetProjectQueryHandler : IRequestHandler<GetProjectQuery, ErrorOr<GetProjectViewModel>>
{
    private readonly IDatabaseContext _context;

    public  GetProjectQueryHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<ErrorOr<GetProjectViewModel>> Handle(GetProjectQuery request, CancellationToken cancellationToken)
    {
        var project = await _context.Projects
            .Include(p => p.Boards)
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken: cancellationToken);

        if (project is null)
        {
            return Errors.Project.ProjectNotFound;
        }

        return new GetProjectViewModel(project);
    }
}

public record GetProjectViewModel(Project Project);