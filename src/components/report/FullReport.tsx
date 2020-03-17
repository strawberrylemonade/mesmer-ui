import React, { useState, useEffect } from 'react';
import { IReport } from '../../services/report-service';
import DebugListItem from '../debug/DebugListItem';

type ReportProps = {
  report?: IReport
}

const Report: React.FC<ReportProps> = ( { report }) => {

  return <div>
    <div>{report? report.id : ''}</div>
      <div>
      { report?.events ? report.events.map(event => (
        <DebugListItem selected={false} event={event}></DebugListItem>
      )) : ''}
    </div>
  </div>
}

export default Report;