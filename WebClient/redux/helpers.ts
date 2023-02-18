import { KanbanBoard } from "../types/kanban-board";

const updateTaskCard = (board: KanbanBoard, task) => {
  const columnIndex = board.columns.findIndex(c => c.id === task.kanbanColumnId);
  const taskIndex = board.columns.findIndex(c => c.id === task.order);
  const selectedTask = board.columns[columnIndex].tasks[taskIndex];

  selectedTask.title = task.title;
  selectedTask.text = task.text;
}