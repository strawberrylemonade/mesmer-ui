import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

interface ListProps {
  title?: string
  link?: string
  actions?: ReactNode
}

const List: React.FC<ListProps> = ({ title, link, actions, children }) => {

  return <div className="bg-white shadow overflow-hidden sm:rounded-md mb-3 md:mb-8">
    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            <Link to={ link ? link : '/' }>
              { title ? title : <Skeleton width={120}></Skeleton> }
            </Link>
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          { actions }
        </div>
      </div>
    </div>
    <ul>
      {children}
    </ul>
  </div>
}

export default List;