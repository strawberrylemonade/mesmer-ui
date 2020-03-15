import React, { useState } from 'react';

import { Helmet } from 'react-helmet';

import Layout from '../Layout';
import Projects from './Projects';
import Button from '../shared/Button';
import Model, { ModalState } from '../shared/Modal';
import NewProjectForm from './NewProjectForm';

const ProjectsView: React.FC = () => {

  const [newProjectModalState, setNewProjectModalState] = useState<ModalState>(ModalState.Closed);

  return <Layout>
    <Helmet>
      <title>{`Mesmer | Projects`}</title>
    </Helmet>
    { newProjectModalState === ModalState.Open ? <Model onDismiss={() => setNewProjectModalState(ModalState.Closed)}>
      <NewProjectForm dismiss={() => setNewProjectModalState(ModalState.Closed)} reload={() => { window.location.reload() }}></NewProjectForm>
    </Model> : null }
    <div className="py-8 bg-gray-800">
      <div className="px-8 max-w-7xl mx-auto">
        <div className="mt-2 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
              Projects
            </h2>
          </div>
          <div className="flex-shrink-0 flex md:mt-0 md:ml-4">
            <Button colour="indigo" onClick={() => setNewProjectModalState(ModalState.Open)}>New project</Button>
          </div>
        </div>
      </div>
    </div>
    <Projects></Projects>
  </Layout>

}

export default ProjectsView;