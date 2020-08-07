import React, { useState, useEffect } from 'react';
import Card from '../shared/Card';
import { Environment } from '../types/environment';
import Skeleton from 'react-loading-skeleton';
import { FaHeartbeat } from 'react-icons/fa';
import { FiLink, FiCpu, FiTrash2 } from 'react-icons/fi';
import LinkEnvironmentToBotModal from './LinkEnvironmentToBotModal';
import { GoGraph } from 'react-icons/go';
import { Link, useHistory } from 'react-router-dom';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import StartOrJoinDebugSessionModal from '../debug/StartOrJoinDebugSessionModal';
import { Project } from '../types/project';
import { getEnvironmentStatus } from '../../services/environment-service';

export interface EnvironmentCardProps {
  environment?: Environment
  project?: Project
}

enum EnvironmentStatus {
  Loading = 'Loading',
  Unknown = 'Unknown',
  Unlinked = 'Unlinked',
  Good = 'Good',
  Poor = 'Poor',
  Bad = 'Bad'
}

function getTextColorForStatus(status: EnvironmentStatus) {
  switch (status) {
    case EnvironmentStatus.Loading:
    case EnvironmentStatus.Unknown:
      return 'gray-600'
    case EnvironmentStatus.Unlinked:
      return 'gray-600'
    case EnvironmentStatus.Good:
      return 'mesmer-600'
    case EnvironmentStatus.Poor:
      return 'poor-orange'
    case EnvironmentStatus.Bad:
      return 'red-500'
    default:
      break;
  }
}

function getHoverColorForStatus(status: EnvironmentStatus) {
  switch (status) {
    case EnvironmentStatus.Loading:
    case EnvironmentStatus.Unknown:
      return 'gray-100'
    case EnvironmentStatus.Unlinked:
      return 'gray-100'
    case EnvironmentStatus.Good:
      return 'mesmer-200'
    case EnvironmentStatus.Poor:
      return 'orange-200'
    case EnvironmentStatus.Bad:
      return 'red-200'
    default:
      break;
  }
}

function getBackgroundForStatus(status: EnvironmentStatus) {
  switch (status) {
    case EnvironmentStatus.Loading:
    case EnvironmentStatus.Unknown:
      return 'white'
    case EnvironmentStatus.Unlinked:
      return 'white'
    case EnvironmentStatus.Good:
      return 'mesmer-50'
    case EnvironmentStatus.Poor:
      return 'orange-50'
    case EnvironmentStatus.Bad:
      return 'red-50'
    default:
      break;
  }
}

const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ environment, project }) => {

  const [environmentStatus, setEnvironmentStatus] = useState<EnvironmentStatus>(EnvironmentStatus.Loading);

  const [showLinkModal, setShowLinkModal] = useState<boolean>()
  const [showDebugModal, setShowDebugModal] = useState<boolean>(false); 

  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!environment) return;
      if (!environment.connection) { setEnvironmentStatus(EnvironmentStatus.Unlinked); return; }
      const { status } = await getEnvironmentStatus(environment.project, environment.environmentId);
      setEnvironmentStatus(status);
    })()
  }, [environment])

  return <div id={`environment-${environment?.environmentId}`} className="bg-white shadow overflow-hidden sm:rounded-lg h-fit">
    <div className={`bg-${getBackgroundForStatus(environmentStatus)} px-4 py-4 border-b border-gray-200`}>
      <div className="flex justify-between">
        <h3 className="text-md leading-6 font-medium gray-600">
          {environment ? environment.name : <Skeleton width={120}></Skeleton>}
        </h3>
        <div className={`flex items-center -mt-2 -mr-2 px-2 py-2 text-gray-900 rounded-md hover:text-gray-900 hover:bg-${getHoverColorForStatus(environmentStatus)} focus:outline-none focus:bg-${getHoverColorForStatus(environmentStatus)} cursor-pointer`}>
          <AiOutlinePushpin></AiOutlinePushpin>
        </div>
      </div>
      <h3 className={`h-12 text-4xl py-2 leading-8 font-bold text-${getTextColorForStatus(environmentStatus)}`}>
        { (environmentStatus && environmentStatus !== EnvironmentStatus.Loading) ? environmentStatus : <Skeleton width={100}></Skeleton> }
      </h3>
      <p className="flex items-center text-sm leading-5 text-gray-500">Updated 5 minutes ago</p>
    </div>
    { showLinkModal && environment ? <LinkEnvironmentToBotModal environment={environment} dismiss={() => { setShowLinkModal(false) }} confirm={() => { window.location.reload() }}></LinkEnvironmentToBotModal> : null }
    <nav className="p-2">
      {
        environment && environment.connection ? <>
          <Link to={`/projects/${environment.project}/environments/${environment.environmentId}`}>
            <div className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <FaHeartbeat className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Health</span>
            </div>
          </Link>
          <div className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
            <GoGraph className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            <span className="truncate">Analytics</span>
          </div>
          { showDebugModal && environment && project ? <StartOrJoinDebugSessionModal dismiss={() => { setShowDebugModal(false) }} environment={environment} project={project} showChoices={false} confirm={(projectId, environmentId, debugSessionId) => { history.push(`/projects/${projectId}/environments/${environmentId}/debug/${debugSessionId}`) }}></StartOrJoinDebugSessionModal> : null }
          <div onClick={() => setShowDebugModal(true)} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
            <FiCpu className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            <span className="truncate">Debugging</span>
          </div>
        </> : 
        <>
          <div onClick={() => {setShowLinkModal(true)}} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
            <FiLink className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            <span className="truncate">Link to a bot</span>
          </div>
          <div className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
            <GoGraph className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            <span className="truncate">Analytics</span>
          </div>
          <div className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-red-600 rounded-md hover:text-red-600 hover:bg-red-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
            <FiTrash2 className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-red-400 group-hover:text-red-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            <span className="truncate">Delete</span>
          </div>
        </>
    }    
    </nav>
  </div>
}
 
export default EnvironmentCard;