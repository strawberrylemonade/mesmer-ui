import React, { useState, useEffect } from 'react';
import Layout from '../Layout'; 
import Button from '../shared/Button';
import { Project } from '../types/project';
import { getProjects } from '../../services/project-service';
import TestsCard from './TestsCard';

import { Helmet } from 'react-helmet';
import Spinner from '../shared/Spinner';

const TestsView: React.FC = () => {

  const [projects, setProjects] = useState<Project[]>()

  useEffect(() => {
    (async () => {
      const projects = await getProjects();
      setProjects(projects);
    })()
  }, [])

  return <Layout>
    <Helmet>
      <title>{`Mesmer | Tests`}</title>
    </Helmet>
    <div className="py-8 bg-mesmer-800">
      <div className="px-8 max-w-7xl mx-auto">
        <div className="mt-2 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
              Tests
            </h2>
          </div>
        </div>
      </div>
    </div>
    <main className="sm:px-8 max-w-7xl mx-auto md:py-8">
      { projects ? projects.map((project) => (
        <TestsCard key={project.id} project={project}></TestsCard>
      )) : <Spinner></Spinner> }
    </main>
  </Layout>
}

export default TestsView;