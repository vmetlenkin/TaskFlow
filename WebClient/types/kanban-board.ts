export type KanbanBoard = {
  id: string;
  projectId: string;
  columns: KanbanColumn[]
};

export type KanbanColumn = {
  id: string;
  name: string;
  tasks: KanbanColumnTask[];
};

export type KanbanColumnTask = {
  id: string;
  title: string;
  kanbanColumnId: string;
  text: string;
}

export type KanbanTask = {
  id: string;
  title: string;
  text: string;
}