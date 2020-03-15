import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Envionment } from '../types/environment';

type EnvironmentStatusCardProps = {
  environment?: Envionment
}

enum EnvionmentStatus {
  Loading = 'Loading',
  Unknown = 'Unknown',
  Unlinked = 'Unlinked',
  Good = 'Good',
  Poor = 'Poor',
  Bad = 'Bad'
}

function getColourForStatus(status: EnvionmentStatus) {
  switch (status) {
    case EnvionmentStatus.Loading:
    case EnvionmentStatus.Unknown:
      return 'gray-600'
    case EnvionmentStatus.Unlinked:
      return 'gray-600'
    case EnvionmentStatus.Good:
      return 'indigo-600'
    case EnvionmentStatus.Poor:
      return 'poor-orange'
    case EnvionmentStatus.Bad:
      return 'red-500'
    default:
      break;
  }
}


const EnvironmentStatusCard: React.FC<EnvironmentStatusCardProps> = ( { environment }) => {

  const [environmentStatus, setEnvironmentStatus] = useState<EnvionmentStatus>(EnvionmentStatus.Loading)

  useEffect(() => {
    if (!environment) return;
    if (!environment.connection) { setEnvironmentStatus(EnvionmentStatus.Unlinked); return; }
    setTimeout(() => {
      setEnvironmentStatus(EnvionmentStatus.Good)
    }, 400);
  }, [environment])

  return <div className={`bg-${getColourForStatus(environmentStatus)} px-6 py-5 shadow overflow-hidden sm:rounded-lg`}>
    <h3 className="text-lg leading-6 font-medium text-white">
      Status
    </h3>
    <h3 className="h-12 text-4xl py-2 leading-8 font-bold text-white">
      { (environmentStatus && environmentStatus !== EnvionmentStatus.Loading) ? environmentStatus : <Skeleton width={100}></Skeleton> }
    </h3>
  </div>
}

export default EnvironmentStatusCard;