import React, { useState, useEffect } from 'react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { FiTrash2, FiCpu, FiEdit3, FiLink } from 'react-icons/fi';
import { FaRegClipboard, FaSlack } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { AiFillWindows } from 'react-icons/ai';

import Layout from '../Layout';
import EnvironmentNavigation from './EnvironmentNavigation';
import Card from '../shared/Card';
import Button from '../shared/Button';
import EnvironmentStatusCard from '../uptime/EnvironmentStatusCard';
import { getEnvironment, updateEnvironment } from '../../services/environment-service';
import { getProject } from '../../services/project-service';
import { Environment } from '../types/environment';
import { Project } from '../types/project';
import { createDebugSession } from '../../services/debug-service';
import DeleteEnvironmentModal from './DeleteEnvironmentModal';
import LinkEnvironmentToBotModal from './LinkEnvironmentToBotModal';
import RunTestModal from '../tests/RunTestModal';
import UptimeTimeline from '../uptime/UptimeTimeline';
import Alert from '../uptime/Alert';
import ManageTestsModal from '../tests/ManageTestsModal';
import ReportCard from '../report/ReportCard';
import { getRecentReport, IReport } from '../../services/report-service';
import Spinner from '../shared/Spinner';
import { useAlert } from 'react-alert';

import NotConnectedImage from '../../assets/binoculus.svg';
import StartOrJoinDebugSessionModal from '../debug/StartOrJoinDebugSessionModal';

const EnvironmentView: React.FC = () => {

  const [environment, setEnvironment] = useState<Environment>()
  const [project, setProject] = useState<Project>()
  const [report, setReport] = useState<IReport>()
  const [alerts, setAlerts] = useState<IReport[]>()

  const alert = useAlert();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>()
  const [showLinkModal, setShowLinkModal] = useState<boolean>()
  const [showRunTestModal, setShowRunTestModal] = useState<boolean>()
  const [showManageTestsModal, setShowManageTestsModal] = useState<boolean>()
  const [showDebugModal, setShowDebugModal] = useState<boolean>(false); 

  const { projectId = '', environmentId = '' } = useParams();
  const location = useLocation();
  const history = useHistory();

  const onCreateDebug = async () => {
    const session = await createDebugSession(projectId, environmentId);
    history.push(`${location.pathname}/debug/${session.id}`)
  }

  useEffect(() => {
    (async () => {
      const project = await getProject(projectId);
      const environment = await getEnvironment(projectId, environmentId);
      const report = await getRecentReport(projectId, environmentId)

      setEnvironment(environment);
      setProject(project);
      setReport(report);
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
    { showManageTestsModal && environment ? <ManageTestsModal environment={environment} dismiss={() => { setShowManageTestsModal(false) }} confirm={() => { window.location.reload() }}></ManageTestsModal> : null }
    { showDebugModal && environment && project ? <StartOrJoinDebugSessionModal dismiss={() => { setShowDebugModal(false) }} showChoices={false} environment={environment} project={project} confirm={(projectId, environmentId, debugSessionId) => { history.push(`/projects/${projectId}/environments/${environmentId}/debug/${debugSessionId}`) }}></StartOrJoinDebugSessionModal> : null }
    <main className="md:px-8 max-w-7xl mx-auto -mt-20 ease-in-out animation-quick animation-once animation-fadeUp flex flex-col-reverse sm:flex-row">
      <div className="flex-grow grid sm:gap-4 gap-2 h-fit">
        { alerts ? <Card title="Alerts">
          <div className="grid gap-2">
            { alerts.map(alert => (
              <Alert></Alert>
            )) }
          </div>
        </Card> : null }
        { environment && !environment.connection ? <Card title="Hey there!" actions={
          <Button colour="mesmer" onClick={() => {setShowLinkModal(true)}}>Link to bot</Button>
        }>
          <div className="flex flex-col-reverse sm:flex-row">
            <img className="-mb-2" src={NotConnectedImage}></img>
            <div className="px-5 flex flex-col justify-center text-sm leading-5 text-gray-500">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Congratulations on your new environment!</h3>
              <p>Before we can keep an eye on your bot, we need you to tell us where to point our binoculars at. Once you've linked your bot, you can start running tests, starting debug sessions and collecting usage analytics.</p>
              <p>If you need a hand you can always head to the <a className="font-medium" href="https://www.notion.so/Help-Center-cc37013b9e9f40aca897bd70cf44ad7a">documentation</a>.</p>
            </div>
          </div>
        </Card>: null }
        { environment?.connection ? 
        <>
          <Card title="Timeline">
            <UptimeTimeline environment={environment}></UptimeTimeline>
          </Card>
          <ReportCard report={report}></ReportCard>
        </> : null }
      </div>
      <div className="w-full sm:min-w-64 sm:w-64 sm:ml-4 grid sm:gap-4 gap-2 h-fit mb-2">
        <SkeletonTheme color="#ffe3e317" highlightColor="#ffffff29">
          <EnvironmentStatusCard environment={environment}></EnvironmentStatusCard>
        </SkeletonTheme>
        <Card title="Actions">
          <nav>
            {
              environment?.connection ? <>
                <div onClick={() => setShowDebugModal(true)} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
                  <FiCpu className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
                  <span className="truncate">Start debug session</span>
                </div>
                <div onClick={() => {setShowRunTestModal(true)}} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
                  <FaRegClipboard className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
                  <span className="truncate">Run test</span>
                </div>
                <div onClick={() => {setShowManageTestsModal(true)}} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
                  <GoGraph className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
                  <span className="truncate">Manage uptime tests</span>
                </div>
              </> : null
            }            
            <div onClick={() => {setShowLinkModal(true)}} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <FiLink className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">{environment?.connection ? 'Relink to a bot' : 'Link to a bot'}</span>
            </div>
            <div onClick={() => { alert.error('Something has gone wrong.') }} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <FiEdit3 className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Edit</span>
            </div>
            <div onClick={() => {setShowDeleteModal(true)}} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <FiTrash2 className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Delete</span>
            </div>
          </nav>
        </Card>
        <Card title="Alerts">
          { environment ? <div>
            { environment.slack ? <div onClick={(async () => { if (window.confirm('Are you sure?')) await updateEnvironment(environment.project, environment.environmentId, { slack: '' }); window.location.reload() })} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
                <FaSlack className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
                <span className="truncate">Remove slack connection</span>
              </div> : <a href={`https://slack.com/oauth/v2/authorize?scope=incoming-webhook&client_id=${window.MESMER_ENVIRONMENT['SLACK_CLIENT_ID']}&state=${environment.id}`} target="_blank" className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
                <FaSlack className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
                <span className="truncate">Connect to Slack</span>
              </a>}
            <div onClick={() => {}} className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150 cursor-pointer">
              <AiFillWindows className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
              <span className="truncate">Teams coming soon</span>
            </div>
          </div>
          : <Spinner></Spinner> }
        </Card>
      </div>
    </main>
  </Layout>
}

export default EnvironmentView;