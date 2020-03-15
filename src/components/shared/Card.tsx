import React from 'react';

type CardProps = {
  title?: string
}


const Card: React.FC<CardProps> = ({ title, children }) => {
  
  return <div className="bg-white shadow overflow-hidden sm:rounded-lg">
    { title ? <div className="border-b px-4 py-5 border-gray-200 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {title}
      </h3>
    </div> : null }
    <div className="px-2 py-2">
      {children}
    </div>
</div>
}

export default Card;