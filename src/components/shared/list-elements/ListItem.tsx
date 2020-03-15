import React from 'react';

const ListItem: React.FC = ({ children }) => (
  <li>
    <div className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
      <div className="px-4 py-4 flex items-center sm:px-6">
        <div className="min-w-0 flex-1 flex items-center justify-between">
          {children}
        </div>
      </div>
    </div>
  </li>
)
export default ListItem;