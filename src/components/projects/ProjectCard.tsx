import React, { useEffect, useState } from 'react';
import { Project } from '../types/project';
import { getEnvironments } from '../../services/environment-service';
import { Environment } from '../types/environment';
import EnvironmentCard from '../environments/EnvironmentCard';
import ProjectActions from './ProjectActions';

type ProjectCardProps = {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {

  const [environments, setEnvironments] = useState<Environment[]>()

  useEffect(() => {
    (async () => {
      if(!project) return;
      const environments = await getEnvironments(project.id);
      setEnvironments(environments);
    })()
  }, [project])

  return <>
    <div className="flex items-center my-2" id={`project-${project.id}`}>
        <h1 className="text-lg leading-6 font-medium gray-600" >{project.name}</h1>
        <ProjectActions project={project}></ProjectActions>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mb-5 pb-4">
      { (environments && project) ? environments.map((environment) => (
        <EnvironmentCard key={environment.id} environment={environment} project={project}></EnvironmentCard>
      )) : <>
        <span className="opacity-75"><EnvironmentCard></EnvironmentCard></span>
        <span className="opacity-50"><EnvironmentCard></EnvironmentCard></span>
        <span className="opacity-25"><EnvironmentCard></EnvironmentCard></span>
      </> }
    </div>
  </>
}

export default ProjectCard;