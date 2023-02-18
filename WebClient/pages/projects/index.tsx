import React, {useState} from 'react';
import MainLayout from '../../layouts/MainLayout';
import Heading from '../../components/ui/Heading';
import Container from '../../components/ui/Container';
import Button from "../../components/ui/Button";
import { wrapper } from "../../redux/store";
import { NextPage } from "next";
import ProjectCard from "../../components/ProjectCard";
import { useAppSelector } from "../../redux/hooks";
import NewProjectModal from "../../components/NewProjectModal/NewProjectModal";
import { ProjectResponse } from "../../redux/api/project-api";

type Props = {
  projects: ProjectResponse[];
}

const ProjectsPage: NextPage<Props> = () => {
  const [newProjectModal, showNewProjectModal] = useState(false);
  const projects = useAppSelector(state => state.project.data.projectList);
  
  return (
    <MainLayout>
      <Heading>
        <div className="pb-8 flex justify-between items-center">
          <h1>Мои проекты</h1>
          <Button onClick={() => showNewProjectModal(true)}>Новый проект</Button>
        </div>
      </Heading>
      <Container>
        <div className="grid grid-cols-3 gap-4">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </Container>
      <NewProjectModal show={newProjectModal} onClose={() => showNewProjectModal(false)}/>
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async () => {
    const user = store.getState().user.data;

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      };
    }
  }
);

export default ProjectsPage;