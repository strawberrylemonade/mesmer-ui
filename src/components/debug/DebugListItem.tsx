import React from 'react';
import { Event } from '../types/environment';
import convertToProperCase from 'lodash.startcase';
import Moment from 'react-moment';

interface DebugListItemProps {
  // Metadata
  selected: boolean
  event: Event
  onClick: () => void
}

export enum EventType {
  Screen,
  Log,
  Error,
  Unknown
}

export const getTagForEventType = (type: EventType) => {
  switch (type) {
    case EventType.Screen:
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        Screen
      </span>
    case EventType.Log:
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
        Log
      </span>
    case EventType.Error:
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-600">
        Error
      </span>
    default:
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
        Custom
      </span>
  }
}

export const getDescriptorsForEvent = (type: EventType, event: Event) => {
  switch (type) {
    case EventType.Screen:
      return <>
        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <span>
            { convertToProperCase(event.state) }
          </span>
        </div>
      </>
    case EventType.Log:
      return null
    case EventType.Error:
      return null
    default:
      return null
  }
}

export const getEventTypeForName = (type: string) => {
  switch (type) {
    case 'screen':
      return EventType.Screen
    case 'debug':
      return EventType.Log
    case 'error':
      return EventType.Error
    default:
      return EventType.Unknown
  }
}

const DebugListItem: React.FC<DebugListItemProps> = ({ selected, event, onClick }) => {

  const type = getEventTypeForName(event.type);

  return <div onClick={onClick} className={`block ${ selected ? 'bg-mesmer-50' : '' } hover:bg-mesmer-50 focus:outline-none transition duration-150 ease-in-out cursor-pointer`}>
    <div className="px-4 py-4">
      <div className="flex items-center justify-between">
        <div className={`text-sm leading-5 font-medium ${type === EventType.Error ? 'text-red-600' : 'text-mesmer-600'} truncate`}>
          { convertToProperCase(event.name) }
        </div>
        <div className="ml-2 flex-shrink-0 flex">
          { getTagForEventType(type) }
        </div>
      </div>
      <div className="mt-2">
        { getDescriptorsForEvent(type, event) }
        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
          <span>
            <Moment fromNow={true}>{event.originalTimestamp}</Moment>
          </span>
        </div>
      </div>
    </div>
  </div>
}

export default DebugListItem;