using Domain.Common;

namespace WebAPI.Entities;

public class User : BaseEntity
{
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Password { get; set; }
    public IEnumerable<Project> Projects { get; private set; } = new List<Project>();
}