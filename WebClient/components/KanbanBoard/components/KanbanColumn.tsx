import React from 'react';
import Dropdown from "../../ui/Dropdown";
import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";
import { KanbanColumn } from "../../../types/kanban-board";

type KanbanColumnProps = {
  column: KanbanColumn;
  onCreateTask: (string) => void;
  children: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = (props) => {
  const { 
    column,
    onCreateTask,
    children
  } = props;
  
  return (
    <Droppable droppableId={column.id.toString()}>
      {(provided) => (
        <div 
          className="bg-[#F4F3F6] dark:bg-zinc-800 rounded-md w-1/4"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="px-2 py-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                <span className="ml-0.5">{column.name}</span>
                <span className="text-gray-400 ml-2">{column.tasks.length}</span>
              </h3>
            </div>
            {children}
            {provided.placeholder}
          </div>
          <button
            onClick={() => onCreateTask(column.id)}
            className="flex justify-center bg-[#EBEAED] dark:bg-indigo-700 dark:hover:bg-indigo-800 p-4 
              font-medium hover:bg-gray-300 w-full rounded-b-md"
          >
            Новая карточка
          </button>
        </div>
      )}
    </Droppable>
  );
};

export default KanbanColumn;