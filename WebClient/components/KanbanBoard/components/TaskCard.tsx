import React, { useRef, useState } from 'react';
import AvatarList from "../../ui/AvatarList";
import { Draggable } from "@hello-pangea/dnd";
import { KanbanColumnTask } from "../../../types/kanban-board";
import Badge from "../../ui/Badge";

type TaskCardProps = {
  task: KanbanColumnTask;
  index: number;
  onClick: (string) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  index, 
  onClick
}) => {
  
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="bg-white dark:bg-zinc-900 rounded-md mb-2 p-4 font-semibold space-y-4"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => onClick(index)}
        >
          <div className="flex">
            <Badge>Без тегов</Badge>
          </div>
          <div>{task.title}</div>
          <AvatarList size="sm" text="ВМ" />
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;