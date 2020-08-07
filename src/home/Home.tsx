import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getProjects } from '../services/project-service';
import ProjectCard from '../components/projects/ProjectCard';
import Spinner from '../components/shared/Spinner';
import { Project } from '../components/types/project';
import Card from '../components/shared/Card';
import { TiPlus } from 'react-icons/ti';
import { GoGraph } from 'react-icons/go';
import { FaRegClipboard } from 'react-icons/fa';
import { FiCpu, FiLogOut, FiBook } from 'react-icons/fi';

import auth from '../helpers/auth';

import HomeDecoration from '../assets/small-binoculous.svg';
import NotSelectedImage from '../assets/grayscale-binoculus.svg';


import StartOrJoinDebugSessionModal from '../components/debug/StartOrJoinDebugSessionModal';
import { useHistory } from 'react-router-dom';
import Modal from '../components/shared/Modal';
import NewProjectForm from '../components/projects/NewProjectForm';
import Alert from '../components/uptime/Alert';

export interface HomeProps {
  
}
 
const Home: React.FC<HomeProps> = () => {

  const [projects, setProjects] = useState<Project[]>()

  const [showDebugModal, setShowDebugModal] = useState<boolean>(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState<boolean>(false); 

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const projects = await getProjects();
      setProjects(projects);
    })()
  }, [])

  return <Layout>
    <div className="py-8 bg-mesmer-800 pb-20">
      <div className="px-8 max-w-7xl mx-auto">
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
              Welcome!
            </h2>
          </div>
          <img className="-mb-24 -mt-16 z-0 hidden md:block ease-in-out animation-1s animation-once animation-fadeIn select-none" src={HomeDecoration}></img>
        </div>
      </div>
    </div>
    <main className="md:px-8 max-w-7xl -mt-20 pt-10 mx-auto ease-in-out animation-quick animation-once animation-fadeUp flex flex-col-reverse sm:flex-row">
      <div className="flex-grow grid sm:gap-4 gap-2 h-fit">
        <Card title="Alerts">
          <div className="flex flex-col justify-center items-center p-4">
            <img className="h-12" src={NotSelectedImage}></img>
            <p className="text-lg leading-5 font-medium text-gray-600 text-center mt-5">No alerts to see for now.</p>
          </div>
        </Card>
        { projects ? projects.map((project) => (
          <ProjectCard key={project.id} project={project}></ProjectCard>
        )) : <Spinner></Spinner>}
      </div>
      <div className="w-full sm:min-w-72 sm:w-72 sm:ml-4 grid sm:gap-4 gap-2 h-fit mb-2 z-10">
        <Card title="Quick Actions">
          <nav>
            { showCreateProjectModal ? <Modal onDismiss={() => setShowCreateProjectModal(false)}> <NewProjectForm dismiss={() => setShowCreateProjectModal(false)} reload={() => { window.location.reload() }}></NewProjectForm></Modal> : null }
            <div id="new-project" onClick={() => setShowCreateProjectModal(true)} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <TiPlus className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Create a new project</span>
            </div>
            <div id="new-environment" className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <TiPlus className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Create a new environment</span>
            </div>
            <div id="new-test" className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <TiPlus className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Create a new test</span>
            </div>
            <div id="new-user" className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <TiPlus className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Invite a new user</span>
            </div>
            <hr className="m-3 border-gray-200"></hr>
            <a href="https://www.notion.so/Help-Center-cc37013b9e9f40aca897bd70cf44ad7a" target="_blank" className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <FiBook className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Read documentation</span>
            </a>
            <a href={window.MESMER_ENVIRONMENT['METABASE_LINK']} target="_blank" className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <GoGraph className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">See analytics</span>
            </a>
            <div className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <FaRegClipboard className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Run a test</span>
            </div>
            { showDebugModal ? <StartOrJoinDebugSessionModal dismiss={() => { setShowDebugModal(false) }} confirm={(projectId, environmentId, debugSessionId) => { history.push(`/projects/${projectId}/environments/${environmentId}/debug/${debugSessionId}`) }}></StartOrJoinDebugSessionModal> : null }
            <div onClick={() => setShowDebugModal(true)} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <FiCpu className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Start or join a debug session</span>
            </div>
            <hr className="m-3 border-gray-200"></hr>
            <div onClick={() => {}} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <FiLogOut className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Sign out</span>
            </div>
          </nav>
        </Card>
      </div>
    </main>
  </Layout>;
}
 
export default Home;