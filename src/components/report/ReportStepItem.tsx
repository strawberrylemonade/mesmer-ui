import React, { useState, useEffect } from 'react';
import { IEvent } from '../types/environment';
import ListItem from '../shared/list-elements/ListItem';
import { IStepReport, ReportStatus } from '../../services/report-service';
import DebugListItem from '../debug/DebugListItem';

import { getColourForStatus } from './ReportCard';

import toProperCase from 'lodash.startcase';

import { TiTick, TiWarning } from 'react-icons/ti';
import { MdError } from 'react-icons/md';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Link } from 'react-router-dom';

type ReportStepItemProps = {
  step: IStepReport
  events: IEvent[]
  onClick: (type: 'IStepReport' | 'IEvent', item: IStepReport | IEvent) => void
}

const getIconForStatus = (status: ReportStatus) => {
  switch (status) {
    case ReportStatus.Good:
      return <TiTick className={`h-6 w-6 text-green-600`}></TiTick>
    case ReportStatus.Poor:
      return <TiWarning className={`h-6 w-6 text-poor-orange`}></TiWarning>
    case ReportStatus.Bad:
      return <MdError className={`h-6 w-6 text-red-600`}></MdError>
    default:
      return <MdError className={`h-6 w-6 text-gray-600`}></MdError>
  }
}

const ReportStepItem: React.FC<ReportStepItemProps> = ({ step, events, onClick }) => {

  const [anyError] = events.filter(event => event.type === 'error');
  step.status = ReportStatus.Good;
  if (anyError) step.status = ReportStatus.Bad;

  const [showEvents, setShowEvents] = useState<boolean>(!!anyError)

  return <li>
    <div className={`block focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out ${showEvents ? 'border-b border-gray-200' : ''}`}>
      <div className="flex items-center">
        <div className="min-w-0 flex-1 flex items-center justify-between">
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center flex-wrap sm:flex-no-wrap px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-${getColourForStatus(ReportStatus[step.status])}-100 sm:mx-0 sm:h-10 sm:w-10`}>
                  {getIconForStatus(ReportStatus[step.status])}
                </div>
                <div className="ml-2">
                  <h2>{toProperCase(step.name)}</h2>
                  <p className="font-normal text-gray-500 text-sm">A description of this type of step</p>
                </div>
              </div>
              <span className={`ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-${getColourForStatus(ReportStatus[step.status])}-100 text-${getColourForStatus(ReportStatus[step.status])}-600`}>
                {step.duration.toPrecision(2)} secs
              </span>
            </div>
            <div className="flex border-b border-t border-gray-200">
              <div onClick={() => onClick('IStepReport', step)} className="p-2 flex flex-1 justify-center items-center border-r border-gray-200 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 cursor-pointer">
                <p className="text-sm leading-5 font-medium text-gray-600 mr-1">See details</p>
              </div>
              <div onClick={() => { if (events.length) setShowEvents(!showEvents) }} className="p-2 flex flex-1 justify-center items-center hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 cursor-pointer">
                { !events.length ? 
                  <p className="text-sm leading-5 font-medium text-gray-600 mr-1">No events for this step</p> :
                  <>
                    <p className="text-sm leading-5 font-medium text-gray-600 mr-1">{ !showEvents ? 'Show events' : 'Hide events'}</p>
                    <span className="mt-0.5">{ !showEvents ? <IoIosArrowDown></IoIosArrowDown> : <IoIosArrowUp></IoIosArrowUp> }</span>
                  </>
                 }
              </div>
            </div>
            {showEvents ? <ul>
              {events.map(event => (
                <DebugListItem onClick={() => onClick('IEvent', event)} key={event.id} event={event} selected={false}></DebugListItem>
              ))}
            </ul> : null}
          </div>
        </div>
      </div>
    </div>
  </li>
}

export default ReportStepItem;