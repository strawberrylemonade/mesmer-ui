import React from 'react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import Button from '../shared/Button';
import Breadcrumbs from '../shared/Breadcrumbs';

type EnvironmentNavigationProps = {
  project?: {
    id: string,
    name: string
  }
  environment?: {
    name: string
  }
}

const EnvironmentNavigation: React.FC<EnvironmentNavigationProps> = ({ project, environment, children }) => {

  let crumbs = [];
  crumbs.push({ name: 'Projects', route: '/projects' });
  if (project) { crumbs.push({ name: project.name, route: `/projects/${project.id}`}); } else { crumbs.push({}) }
  
  return <SkeletonTheme color="#ffe3e317" highlightColor="#ffffff29">
    <div className="py-8 bg-gray-800 pb-28">
      <div className="px-8 max-w-7xl mx-auto">
        <Breadcrumbs routes={crumbs}></Breadcrumbs>
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
              { environment ? environment.name : <Skeleton width={250}></Skeleton> }
            </h2>
          </div>
          <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            { children }
          </div>
        </div>
      </div>
    </div>
  </SkeletonTheme>
}

export default EnvironmentNavigation;