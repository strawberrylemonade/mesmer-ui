import React, { useState, useEffect } from 'react';
import { IReport, ReportStatus } from '../../services/report-service';
import DebugListItem from '../debug/DebugListItem';
import Card from '../shared/Card';
import Button from '../shared/Button';
import Skeleton from 'react-loading-skeleton';
import ReportStepItem from './ReportStepItem';
import { useHistory } from 'react-router-dom';

type ReportCardProps = {
  report?: IReport
  events?: Event[]
}

export function getColourForStatus(status: ReportStatus) {
  switch (status) {
    case ReportStatus.Good:
      return 'green'
    case ReportStatus.Poor:
      return 'orange'
    case ReportStatus.Bad:
      return 'red'
    default:
      return 'gray'
  }
}

const ReportCard: React.FC<ReportCardProps> = ( { report }) => {

  const history = useHistory();

  return <div className="bg-white shadow overflow-hidden sm:rounded-lg">
    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
        <div className="ml-4 mt-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Latest report
            { report ? <span className={`ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-${getColourForStatus(ReportStatus[report.status])}-100 text-${getColourForStatus(ReportStatus[report.status])}-800`}>
              {report.status}
            </span> : <span className="ml-2"><Skeleton width={50}></Skeleton></span>}
          </h3>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0">
          <span className="inline-flex rounded-md shadow-sm">
            <Button to={ report ? `/projects/${report.project}/environments/${report.environment}/reports/${report.id}` : ''} colour="mesmer">Open full report</Button>
          </span>
        </div>
      </div>
    </div>
    <ul>
      { report ? report.steps.map(step => {
        const events = report.events?.filter((event) => {
          const originalEventDate = new Date(event.originalTimestamp);
          return ((originalEventDate.getTime() <= new Date(step.ended).getTime() && originalEventDate.getTime() >= new Date(step.started).getTime()))
        }) ?? []
        return <ReportStepItem onClick={(item) => history.push(`/projects/${report.project}/environments/${report.environment}/reports/${report.id}/`) } key={step.name} step={step} events={events}></ReportStepItem>
      }) : null }
    </ul>
  </div>
}

export default ReportCard;