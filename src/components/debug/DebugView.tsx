import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Layout from '../Layout';
import { mesmerWSBaseUrl } from '../../services/client';
import { useParams } from 'react-router-dom';
import { Event, Envionment } from '../types/environment';
import DebugListItem from './DebugListItem';
import Card from '../shared/Card';
import { getDebugSession } from '../../services/debug-service';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import JSONViewer from '../shared/JSONViewer';

import convertToProperCase from 'lodash.startcase';
import Breadcrumbs from '../shared/Breadcrumbs';
import { Project } from '../types/project';
import { getProject } from '../../services/project-service';
import { getEnvironment } from '../../services/environment-service';
import FormDescription from '../shared/form-elements/FormDescription';
import FormSection from '../shared/form-elements/FormSection';

const DebugView: React.FC = () => {

  const { projectId = '', environmentId = '', debugId = '' } = useParams();

  const [environment, setEnvironment] = useState<Envionment>()
  const [project, setProject] = useState<Project>()

  const [events, setEvents] = useState<Event[]>([]);
  const [session, setSession] = useState();
  const [sendMessage, lastMessage, readyState, getWebSocket] = useWebSocket(`${mesmerWSBaseUrl}/projects/${projectId}/environments/${environmentId}/debug/${debugId}`);

  const [selectedEvent, setSelectedEvent] = useState<Event>();

  useEffect(() => {
    (async () => {
      const project = await getProject(projectId);
      const environment = await getEnvironment(projectId, environmentId);

      setEnvironment(environment);
      setProject(project);

      const session = await getDebugSession(projectId, environmentId, debugId);
      const messages: Event[] = session.events;
      setSession(session);
      setEvents(messages);
    })()
  }, [debugId])

  useEffect(() => {
    if (lastMessage !== null) {
      setEvents(prev => ([JSON.parse(lastMessage.data), ...prev]));
    }
  }, [lastMessage]);

  return <Layout>
    <SkeletonTheme color="#ffe3e317" highlightColor="#ffffff29">
      <div className="py-8 bg-gray-800">
        <div className="px-8 max-w-7xl mx-auto">
          <Breadcrumbs routes={[{ name: 'Projects', route: '/projects' }, { name: project?.name, route: project?.id ? `/projects/${project.id}` : undefined }, { name: environment?.name, route: (project?.id && environment?.environmentId) ? `/projects/${project.id}/environments/${environment.environmentId}` : undefined }]}></Breadcrumbs>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
                Debug
              </h2>
            </div>
            <div className="flex items-center flex-col">
              <p className="text-gray-400 transition duration-150 ease-in-out text-sm">Connection code</p>
              <h2 className="text-xl font-bold leading-7 text-white sm:text-2xl sm:leading-9 sm:truncate">
                { session ? session.code : <Skeleton width={120}></Skeleton> }
              </h2>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
    <main className="sm:px-8 max-w-7xl mx-auto md:py-8 grid md:grid-cols-two-column gap-4 h-c-full">
      <div className="bg-white shadow overflow-scroll sm:rounded-lg">
        <ul>
          { events.map((event) => (
            <li key={event.id} onClick={() => { setSelectedEvent(event) }}>
              <DebugListItem event={event} selected={event.originalTimestamp === selectedEvent?.originalTimestamp}></DebugListItem>
            </li>
          ))}
        </ul>
      </div>
      <Card title={ selectedEvent ? convertToProperCase(selectedEvent.name) : ''}>
          { selectedEvent ?
            <>
              <JSONViewer value={selectedEvent.context?.data}></JSONViewer>
            </>
          : null }
      </Card>
    </main>
  </Layout>
}

export default DebugView;