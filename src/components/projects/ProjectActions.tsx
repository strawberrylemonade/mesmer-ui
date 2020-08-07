import React, { useState } from 'react';

import { Project } from '../types/project'
import Model, { ModalState } from '../shared/Modal';
import NewEnvironmentForm from '../environments/NewEnvironmentForm';
import { FiTrash2 } from 'react-icons/fi';
import { TiPlus } from 'react-icons/ti';
import { Link } from 'react-router-dom';

export interface ProjectActionsProps {
  project: Project
}
 
const ProjectActions: React.FC<ProjectActionsProps> = ({ project }) => {

  const [droppedDown, setDroppedDown] = useState<boolean>(false);
  const [newEnvironmentModal, setNewEnvironmentModal] = useState<boolean>(false);
  const [deleteProjectModal, setDeleteProjectModal] = useState<boolean>(false);

  return <>
    { newEnvironmentModal ? <Model onDismiss={() => setNewEnvironmentModal(false)}>{ project ? <NewEnvironmentForm projectId={project.id} dismiss={() => setNewEnvironmentModal(false)} reload={() => { window.location.reload() }}></NewEnvironmentForm> : null }</Model> : null }
    <div className="relative inline-block text-left">
      <div>
        <button onClick={() => setDroppedDown(!droppedDown)} className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      { droppedDown ? <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg">
        <div className="rounded-md bg-white shadow-xs">
          <div className="p-2">
            <div id="new-environment" onClick={() => setNewEnvironmentModal(true)} className="flex px-4 py-2 text-sm font-medium leading-5 text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer">
              <TiPlus className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Create Environment</span>
            </div>
            <Link to={`/projects/${project.id}/tests/new`} className="flex px-4 py-2 text-sm font-medium leading-5 text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer">
              <TiPlus className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Create Test</span>
            </Link>
            <div onClick={() => setDeleteProjectModal(true)} className="flex px-4 py-2 text-sm font-medium leading-5 text-red-600 rounded-md hover:text-red-600 hover:bg-red-100 focus:outline-none focus:bg-gray-200 cursor-pointer">
              <FiTrash2 className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 transition ease-in-out duration-150" />
              <span className="truncate">Delete Project</span>
            </div>
          </div>
        </div>
      </div> : null }
    </div>
  </>;
}
 
export default ProjectActions;