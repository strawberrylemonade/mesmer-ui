import React, { useState, useEffect } from 'react';

import './UptimeTimeline.css';
import { Environment } from '../types/environment';
import { getRecentReports, IReport, ReportStatus } from '../../services/report-service';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Skeleton from 'react-loading-skeleton';

type UptimeTimelineProps = {
  environment?: Environment
}

function getColourForStatus(status: ReportStatus) {
  switch (status) {
    case ReportStatus.Good:
      return 'mesmer-400'
    case ReportStatus.Poor:
      return 'poor-orange'
    case ReportStatus.Bad:
      return 'red-500'
    default:
      return 'gray-200'
  }
}

const UptimeTimeline: React.FC<UptimeTimelineProps> = ({ environment }) => {

  const placeholders = new Array(40).fill(null);
  const [reports, setReports] = useState<IReport[]>(placeholders)
  const [lastChecked, setLastChecked] = useState<Date>()
  const [firstChecked, setFirstChecked] = useState<Date>()

  useEffect(() => {
    (async () => {
      if (!environment) return;
      const reports = await getRecentReports(environment.project, environment.environmentId);

      if (!reports.length) return;
      const latest = reports[reports.length - 1];
      setLastChecked(latest.createdAt);

      const earliest = reports[0];
      setFirstChecked(earliest.createdAt);

      const items = new Array(40).fill({}).map((v, i: number) => (reports[i - (40 - reports.length)] ?? {}));
      setReports(items);
    })()
  }, [environment])
  
  return <div className="p-2">
    <div className="h-16 flex flex-row timeline">
      { reports.map((report) => (
        environment && report ? <Link to={report.id ? `/projects/${report.project}/environments/${report.environment}/reports/${report.id}` : `/projects/${environment.project}/environments/${environment.environmentId}`} className={`bg-${getColourForStatus(ReportStatus[report.status])} rounded-sm flex-grow mr-1 box-border timeline-item cursor-pointer`}>
          </Link> : 
        <div className={`bg-gray-100 rounded-sm flex-grow mr-1 box-border timeline-item cursor-pointer`}></div>
      )) }
    </div>
    <hr className="my-4 border-gray-100"></hr>
    <div className="flex flex-row">
      <p className="text-sm leading-5 text-gray-900">Data from {firstChecked ? <><Moment fromNow>{firstChecked}</Moment> to now</> : <Skeleton width={70}></Skeleton>}</p>
      <div className="flex-grow"></div>
      <p className="font-medium text-sm leading-5 text-gray-900">Last checked: { lastChecked ? <Moment fromNow={true}>{lastChecked}</Moment> : <Skeleton width={100}></Skeleton> }</p>
    </div>
  </div>
}

export default UptimeTimeline;