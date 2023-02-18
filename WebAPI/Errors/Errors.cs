using ErrorOr;

namespace WebAPI.Errors;

public static class Authentication
{
    public static Error InvalidCredentials => Error.Conflict(
        code: "Auth.InvalidCred",
        description: "Неверный email или пароль");
    
    public static Error DuplicateEmail => Error.Conflict(
        code: "User.DuplicateEmail",
        description: "Email уже используется другим пользователем");
    
    public static Error UserNotFound => Error.NotFound(
        code: "User.UserNotFound",
        description: "Пользователь не найден");
}

public static class Project
{
    public static Error ProjectNotFound => Error.NotFound(
        code: "Project.ProjectNotFound",
        description: "Проект не найден");
}

public static class Kanban
{
    public static Error KanbanBoardNotFound => Error.NotFound(
        code: "Kanban.BoardNotFound",
        description: "Kanban-доска с данным id не найдена");
    
    public static Error KanbanColumnNotFound => Error.NotFound(
        code: "Kanban.ColumnNotFound",
        description: "Kanban-колонка с данным id не найдена");
    
    public static Error NotFound => Error.NotFound(
        code: "Kanban.NotFound",
        description: "Неравильно введены данные");
    
    public static Error KanbanTaskNotFound => Error.NotFound(
        code: "Kanban.TaskNotFound",
        description: "Карточка не найдена");
}