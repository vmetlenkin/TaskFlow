import React from 'react';
import Card from "./ui/Card";
import Link from "next/link";
import AvatarList from "./ui/AvatarList";
import { ProjectResponse } from "../redux/api/project-api";

type Props = {
  project: ProjectResponse;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <div>
        </div>
      </div>
      <Link href={{pathname: `/projects/${project.id}`, query: { page: 'kanban' }} }>
        <h5 className="text-xl font-semibold mb-4 hover:text-indigo-700">{project.name}</h5>
      </Link>
      <p className="mb-4">
        {project.description || 'Нет описания'}
      </p>
      <div className="flex justify-between">
        <div>

        </div>
        <AvatarList text=".." />
      </div>
    </Card>
  );
};

export default ProjectCard;