import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Layout from '../Layout';
import { WSBaseUrl } from '../../services/client';
import { useParams } from 'react-router-dom';
import { IEvent, Environment } from '../types/environment';
import DebugListItem from './DebugListItem';
import Card from '../shared/Card';
import { getDebugSession } from '../../services/debug-service';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Breadcrumbs from '../shared/Breadcrumbs';
import { Project } from '../types/project';
import { getProject } from '../../services/project-service';
import { getEnvironment } from '../../services/environment-service';

import NotSelectedImage from '../../assets/grayscale-binoculus.svg';
import Spinner from '../shared/Spinner';
import EventDetailCard from './EventDetailCard';

const DebugView: React.FC = () => {

  const { projectId = '', environmentId = '', debugId = '' } = useParams();

  const [environment, setEnvironment] = useState<Environment>()
  const [project, setProject] = useState<Project>()

  const [events, setEvents] = useState<IEvent[]>();
  const [session, setSession] = useState<any>();
  const [sendMessage, lastMessage, readyState, getWebSocket] = useWebSocket(`${WSBaseUrl}/projects/${projectId}/environments/${environmentId}/debug/${debugId}`);

  const [selectedEvent, setSelectedEvent] = useState<IEvent>();

  useEffect(() => {
    (async () => {
      const project = await getProject(projectId);
      const environment = await getEnvironment(projectId, environmentId);

      setEnvironment(environment);
      setProject(project);

      const session = await getDebugSession(projectId, environmentId, debugId);
      const messages: IEvent[] = session.events;
      setSession(session);
      setEvents(messages);
    })()
  }, [debugId])

  useEffect(() => {
    if (lastMessage !== null) {
      setEvents(prev =>  ([JSON.parse(lastMessage.data), ...(prev ?? [])]));
    }
  }, [lastMessage]);

  return <Layout>
    <SkeletonTheme color="#ffe3e317" highlightColor="#ffffff29">
      <div className="py-8 bg-mesmer-800">
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
    <main className="sm:px-8 max-w-7xl mx-auto md:py-8 grid md:grid-cols-2 gap-4 h-c-full">
      <div className="bg-white shadow overflow-scroll sm:rounded-lg">
        { events ? <ul> 
          { events.map(event => {
            return <DebugListItem onClick={() => setSelectedEvent(event)} key={event.name} event={event} selected={`${event.originalTimestamp}-${selectedEvent?.name}` === `${selectedEvent?.originalTimestamp}-${event.name}`}></DebugListItem>
          }) } 
        </ul>  : <div className="mt-12"><Spinner></Spinner></div> }
      </div>
        { selectedEvent ? <EventDetailCard event={selectedEvent}></EventDetailCard> :
        <Card className={!selectedEvent ? 'pointer-events-none opacity-50' : ''}>
          <div className="justify-center items-center flex-col flex mt-8 max-w-sm mx-auto" style={{ height: '70vh' }}>
            <img src={NotSelectedImage}></img>
            <p className="text-lg leading-5 font-medium text-gray-600 text-center mt-5">Select an event on the panel to see more detail here.</p>
          </div>
        </Card>
       }
    </main>
  </Layout>
}

export default DebugView;