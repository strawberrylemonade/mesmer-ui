import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { getProjects } from '../../services/project-service';
import { Project } from '../types/project';
import ProjectCard from './ProjectCard';
import Spinner from '../shared/Spinner';

const Projects: React.FC = () => {

  const [projects, setProjects] = useState<Project[]>()

  useEffect(() => {
    (async () => {
      const projects = await getProjects();
      setProjects(projects);
    })()
  }, [])


  return <main className="md:px-8 max-w-7xl mx-auto md:py-8">
      { projects ? projects.map((project) => (
        <ProjectCard key={project.id} project={project}></ProjectCard>
      )) : <Spinner></Spinner>}
    </main>

}

export default Projects;