import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

type BreadcrumbsProps = {
  routes: BreadcrumbsRoute[]
}

type BreadcrumbsRoute = {
  name?: string
  route?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ routes }) => {

  return <div>
    <nav className="sm:hidden">
      <a href={routes[routes.length - 1].route} className="flex items-center text-sm leading-5 font-medium text-gray-400 hover:text-gray-200 focus:outline-none focus:underline transition duration-150 ease-in-out">
        <svg className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
        Back
      </a>
    </nav>
    <nav className="hidden sm:flex items-center text-sm leading-5 font-medium">
      { routes.map((route, index) => {
        return <React.Fragment key={index}>
          { route.route ? <Link to={route.route} className="text-gray-400 hover:text-gray-200 focus:outline-none focus:underline transition duration-150 ease-in-out">{route.name}</Link> : <Skeleton width={100}></Skeleton> }
          { index !== (routes.length - 1) ? <svg className="flex-shrink-0 mx-2 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>: <></> }
        </React.Fragment>
      })}
    </nav>
  </div>
}

export default Breadcrumbs;