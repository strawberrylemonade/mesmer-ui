import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';

import Layout from '../Layout';
import { useParams } from 'react-router-dom';
import { getReport, IReport, IStepReport } from '../../services/report-service';
import { SkeletonTheme } from 'react-loading-skeleton';
import Breadcrumbs from '../shared/Breadcrumbs';
import Card from '../shared/Card';
import ReportStepItem from './ReportStepItem';
import { IEvent } from '../types/environment';

import NotSelectedImage from '../../assets/grayscale-binoculus.svg';
import Spinner from '../shared/Spinner';
import EventDetailCard from '../debug/EventDetailCard';

const ReportView: React.FC = () => {

  const [report, setReport] = useState<IReport>()
  const [selected, setSelected] = useState<{ type: 'IStepReport' | 'IEvent', item: IStepReport | IEvent }>()

  const { projectId = '', environmentId = '', reportId = '' } = useParams();

  useEffect(() => {
    (async () => {
      const report = await getReport(projectId, environmentId, reportId);
      setReport(report);
    })()
  }, [projectId])


  return <Layout>
    <Helmet>
      <title>{`Mesmer | Report`}</title>
    </Helmet>
    <SkeletonTheme color="#ffe3e317" highlightColor="#ffffff29">
      <div className="py-8 bg-mesmer-800">
        <div className="px-8 max-w-7xl mx-auto">
          <Breadcrumbs routes={[{ name: 'Projects', route: '/projects' }, { name: undefined, route: !undefined ? `/projects/${undefined}` : undefined }, { name: undefined, route: !(undefined && undefined) ? `/projects/${undefined}/environments/${undefined}` : undefined }]}></Breadcrumbs>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
                Report
              </h2>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
    <main className="sm:px-8 max-w-7xl mx-auto md:py-8 grid md:grid-cols-2 gap-4 h-c-full">
      <div className="bg-white shadow overflow-scroll sm:rounded-lg">
        { report ? <ul> 
          { report.steps.map(step => {
            const events = report.events?.filter((event) => {
              const originalEventDate = new Date(event.originalTimestamp);
              return ((originalEventDate.getTime() <= new Date(step.ended).getTime() && originalEventDate.getTime() >= new Date(step.started).getTime()))
            }) ?? []
            return <ReportStepItem onClick={(type, item) => setSelected({type, item})}  key={step.name} step={step} events={events}></ReportStepItem>
          }) } 
        </ul>  : <div className="mt-12"><Spinner></Spinner></div> }
      </div>
      
        { selected ? <> {
          (selected.type === 'IEvent') ?
          <EventDetailCard event={selected.item as IEvent}></EventDetailCard> :
          <h1>{selected.item.name}</h1>
        } </> :
        <Card className={!selected ? 'pointer-events-none opacity-50' : ''}>
          <div className="justify-center items-center flex-col flex mt-8 max-w-sm mx-auto" style={{ height: '70vh' }}>
            <img src={NotSelectedImage}></img>
            <p className="text-lg leading-5 font-medium text-gray-600 text-center mt-5">Select a step or event on the panel to see more detail here.</p>
          </div>
        </Card>  }
    </main>
  </Layout>
}

export default ReportView;