using MediatR;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;
using WebAPI.Interfaces;

namespace WebAPI.Features.Projects.GetProjects;

public record GetProjectsQuery(int? UserId) : IRequest<GetProjectsViewModel>;

public class  GetProjectsQueryHandler : IRequestHandler<GetProjectsQuery, GetProjectsViewModel>
{
    private readonly IDatabaseContext _context;

    public  GetProjectsQueryHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<GetProjectsViewModel> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<Project> projects;

        if (request.UserId is null)
        {
            projects = await _context.Projects
                .ToListAsync(cancellationToken: cancellationToken);
        }
        else
        {
            projects = await _context.Projects
                .Where(p => p.UserId == request.UserId)
                .ToListAsync(cancellationToken: cancellationToken);
        }

        return new GetProjectsViewModel(projects);
    }
}

public record GetProjectsViewModel(IEnumerable<Project> Projects);