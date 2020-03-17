import React, { useState, useEffect } from 'react';
import { IReport } from '../../services/report-service';
import DebugListItem from '../debug/DebugListItem';
import Card from '../shared/Card';
import Button from '../shared/Button';

type ReportCardProps = {
  report?: IReport
}

const ReportCard: React.FC<ReportCardProps> = ( { report }) => {

  return <div className="bg-white shadow overflow-hidden sm:rounded-lg">
    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
        <div className="ml-4 mt-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Latest report
          </h3>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.
          </p>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0">
          <span className="inline-flex rounded-md shadow-sm">
            <Button to={ report ? `/projects/${report.project}/environments/${report.environment}/reports/${report.id}` : ''} colour="indigo">Open full report</Button>
          </span>
        </div>
      </div>
    </div>
    <p>sadsa</p>

  </div>
}

export default ReportCard;