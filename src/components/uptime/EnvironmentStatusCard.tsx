import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Environment } from '../types/environment';

type EnvironmentStatusCardProps = {
  environment?: Environment
}

enum EnvironmentStatus {
  Loading = 'Loading',
  Unknown = 'Unknown',
  Unlinked = 'Unlinked',
  Good = 'Good',
  Poor = 'Poor',
  Bad = 'Bad'
}

function getColourForStatus(status: EnvironmentStatus) {
  switch (status) {
    case EnvironmentStatus.Loading:
    case EnvironmentStatus.Unknown:
      return 'gray-600'
    case EnvironmentStatus.Unlinked:
      return 'gray-600'
    case EnvironmentStatus.Good:
      return 'mesmer-600'
    case EnvironmentStatus.Poor:
      return 'poor-orange'
    case EnvironmentStatus.Bad:
      return 'red-500'
    default:
      break;
  }
}


const EnvironmentStatusCard: React.FC<EnvironmentStatusCardProps> = ( { environment }) => {

  const [environmentStatus, setEnvironmentStatus] = useState<EnvironmentStatus>(EnvironmentStatus.Loading)

  useEffect(() => {
    if (!environment) return;
    if (!environment.connection) { setEnvironmentStatus(EnvironmentStatus.Unlinked); return; }
    setTimeout(() => {
      setEnvironmentStatus(EnvironmentStatus.Good)
    }, 400);
  }, [environment])

  return <div className={`bg-${getColourForStatus(environmentStatus)} px-6 py-5 shadow overflow-hidden sm:rounded-lg`}>
    <h3 className="text-lg leading-6 font-medium text-white">
      Status
    </h3>
    <h3 className="h-12 text-4xl py-2 leading-8 font-bold text-white">
      { (environmentStatus && environmentStatus !== EnvironmentStatus.Loading) ? environmentStatus : <Skeleton width={100}></Skeleton> }
    </h3>
  </div>
}

export default EnvironmentStatusCard;