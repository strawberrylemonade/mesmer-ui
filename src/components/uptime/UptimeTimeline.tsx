import React, { useState, useEffect } from 'react';

import './UptimeTimeline.css';

const UptimeTimeline: React.FC = () => {

  const [reports, setReports] = useState<number[]>()

  useEffect(() => {
    setReports(new Array(40).fill(null).map(() => Math.random()));
  }, [])
  
  return <div className="p-2">
    <div className="h-16 flex flex-row timeline">
      { reports?.map((report) => (
        <div className={`bg-${report > 0.2 ? 'green' : report > 0.1 ? 'red' : 'orange'}-400 rounded-sm flex-grow mr-1 box-border timeline-item cursor-pointer`}>{}</div>
      )) }
    </div>
    <hr className="my-4 border-gray-100"></hr>
    <div className="flex flex-row">
      <p className="text-sm leading-5 text-gray-900">Last 24 hours</p>
      <div className="flex-grow"></div>
      <p className="font-medium text-sm leading-5 text-gray-900">Updated 20 mins ago</p>
    </div>
  </div>
}

export default UptimeTimeline;