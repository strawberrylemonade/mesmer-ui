import React, { useState, useEffect } from 'react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { FiTrash2, FiCpu, FiEdit3, FiLink } from 'react-icons/fi';
import { FaRegClipboard } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';

import Layout from '../Layout';
import EnvironmentNavigation from './EnvironmentNavigation';
import Card from '../shared/Card';
import Button from '../shared/Button';
import EnvironmentStatusCard from '../uptime/EnvironmentStatusCard';
import { getEnvironment } from '../../services/environment-service';
import { getProject } from '../../services/project-service';
import { Envionment } from '../types/environment';
import { Project } from '../types/project';
import { createDebugSession } from '../../services/debug-service';
import DeleteEnvironmentModal from './DeleteEnvironmentModal';
import LinkEnvironmentToBotModal from './LinkEnvironmentToBotModal';
import RunTestModal from '../tests/RunTestModal';
import UptimeTimeline from '../uptime/UptimeTimeline';
import Alert from '../uptime/Alert';

const EnvionmentView: React.FC = () => {

  const [environment, setEnvironment] = useState<Envionment>()
  const [project, setProject] = useState<Project>()

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>()
  const [showLinkModal, setShowLinkModal] = useState<boolean>()
  const [showRunTestModal, setShowRunTestModal] = useState<boolean>()

  const { projectId = '', environmentId = '' } = useParams();
  const location = useLocation();
  const history = useHistory();

  const onCreateDebug = async () => {
    const session = await createDebugSession(projectId, environmentId);
    history.push(`${location.pathname}/debug/${session.id}`)
  }

  const onEdit = async () => {
  }

  const onRunTest = async () => {
  }

  useEffect(() => {
    (async () => {
      const project = await getProject(projectId);
      const environment = await getEnvironment(projectId, environmentId);

      setEnvironment(environment);
      setProject(project);
    })()
  }, [projectId, environmentId])

  return <Layout>
    <Helmet>
      <title>{`Mesmer | ${project ? project.name : 'Project'} - ${environment ? environment.name : 'Environment'}`}</title>
    </Helmet>
    <EnvironmentNavigation project={project} environment={environment}>
    </EnvironmentNavigation>
    { showDeleteModal && environment ? <DeleteEnvironmentModal environment={environment} dismiss={() => { setShowDeleteModal(false) }} confirm={() => { history.push(`/projects/${projectId}`) }}></DeleteEnvironmentModal> : null }
    { showLinkModal && environment ? <LinkEnvironmentToBotModal environment={environment} dismiss={() => { setShowLinkModal(false) }} confirm={() => { window.location.reload() }}></LinkEnvironmentToBotModal> : null }
    { showRunTestModal && environment ? <RunTestModal environment={environment} dismiss={() => { setShowRunTestModal(false) }} confirm={() => { window.location.reload() }}></RunTestModal> : null }
    <main className="md:px-8 max-w-7xl mx-auto -mt-20 ease-in-out animation-quick animation-once animation-fadeUp flex flex-col-reverse sm:flex-row">
      <div className="flex-grow grid sm:gap-4 gap-2 h-fit">
        <Card title="Alerts">
          <div className="grid gap-2">
            <Alert></Alert>
            <Alert></Alert>
          </div>
        </Card>
        <Card title="Timeline">
          <UptimeTimeline></UptimeTimeline>
        </Card>
        <Card title="Report"></Card>
      </div>
      <div className="w-full sm:w-64 sm:ml-4 grid sm:gap-4 gap-2 h-fit mb-2">
        <SkeletonTheme color="#ffe3e317" highlightColor="#ffffff29">
          <EnvironmentStatusCard environment={environment}></EnvironmentStatusCard>
        </SkeletonTheme>
        <Card title="Actions">
          <nav>
            {
              environment?.connection ? <>
                <div onClick={onCreateDebug} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
                  <FiCpu className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
                  <span className="truncate">Start debug session</span>
                </div>
                <div onClick={() => {setShowRunTestModal(true)}} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
                  <FaRegClipboard className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
                  <span className="truncate">Run test</span>
                </div>
                <div onClick={onRunTest} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
                  <GoGraph className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
                  <span className="truncate">Manage uptime tests</span>
                </div>
              </> : null
            }            
            <div onClick={() => {setShowLinkModal(true)}} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <FiLink className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">{environment?.connection ? 'Relink to a bot' : 'Link to a bot'}</span>
            </div>
            <div onClick={onEdit} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <FiEdit3 className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Edit</span>
            </div>
            <div onClick={() => {setShowDeleteModal(true)}} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <FiTrash2 className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Delete</span>
            </div>
          </nav>
        </Card>
      </div>
    </main>
  </Layout>
}

export default EnvionmentView;