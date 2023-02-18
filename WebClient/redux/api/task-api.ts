import { instance } from "./index";

export type CreateTaskResponse = {
  id: string;
  kanbanColumnId: string;
  projectId: string;
  title: string;
  text: string;
}

export type CreateTaskRequest = {
  kanbanColumnId: string;
  title: string;
  text: string;
}

export type UpdateTaskRequest = {
  id: number;
  title: string;
  text: string;
}


export type MoveKanbanTaskRequest = {
  id: string;
  sourceColumnId: string;
  destinationColumnId: string;
  sourcePosition: number;
  destinationPosition: number;
}

export const TaskApi = {
  async create(request: CreateTaskRequest): Promise<CreateTaskResponse> {
    const { data } = await instance.post(`/tasks`, request);
    return data;
  },
  async getById(id: string): Promise<CreateTaskResponse> {
    const { data } = await instance.get(`/tasks/${id}`);
    return data;
  },
  async moveKanbanTask(request: MoveKanbanTaskRequest): Promise<CreateTaskResponse> {
    const { data } = await instance.patch(`/tasks/change_position`, request);
    return data;
  },
  async updateKanbanTask(request: UpdateTaskRequest): Promise<CreateTaskResponse> {
    const { data } = await instance.patch(`/tasks`, request);
    console.log(data)
    return data;
  },
  async deleteKanbanTask(id: string): Promise<CreateTaskResponse> {
    const { data } = await instance.delete(`/tasks/${id}`);
    return data;
  }
}