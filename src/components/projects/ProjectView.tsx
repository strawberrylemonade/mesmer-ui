import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';

import Layout from '../Layout';
import ProjectCard from './ProjectCard';
import { Project } from '../types/project';
import { getProject } from '../../services/project-service';
import { useParams } from 'react-router-dom';
import TestsCard from '../tests/TestsCard';

const ProjectView: React.FC = () => {

  const [project, setProject] = useState<Project>()

  const { projectId = '' } = useParams();

  useEffect(() => {
    (async () => {
      const project = await getProject(projectId);
      setProject(project);
    })()
  }, [projectId])


  return <Layout>
    <Helmet>
      <title>{`Mesmer | ${project ? project.name : 'Project'}`}</title>
    </Helmet>
    <main className="sm:px-8 max-w-7xl mx-auto md:py-8">
      { project ? <>
        <ProjectCard project={project}></ProjectCard>
        <TestsCard project={project}></TestsCard>
      </> : null }
    </main>
  </Layout>
}

export default ProjectView;