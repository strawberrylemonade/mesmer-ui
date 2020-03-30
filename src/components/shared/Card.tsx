import React, { ReactNode } from 'react';

type CardProps = {
  title?: string
  className?: string
  actions?: ReactNode
}


const Card: React.FC<CardProps> = ({ title, children, actions, className = '' }) => {
  
  return <div className={`bg-white shadow overflow-hidden sm:rounded-lg ${className}`}>
    { title || actions ? <div className="border-b px-4 py-5 border-gray-200 sm:px-6">
      <div className="flex items-center justify-between flex-wrap sm:flex-no-wrap">
      { title ? <h3 className="text-lg leading-6 font-medium text-gray-900">
          {title}
        </h3>
      : null }
      { actions ? <div className="ml-4 mt-2 flex-shrink-0">
            { actions }
        </div> : null }
      </div>
    </div> : null }
    <div className="px-2 py-2">
      {children}
    </div>
</div>
}

export default Card;