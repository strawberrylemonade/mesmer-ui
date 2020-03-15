import React from 'react';

import Header from './Header';

const Layout: React.FC = ( { children }) => {

  return <div className="min-h-screen bg-gray-100">
    <Header></Header>
    { children }
  </div>
}

export default Layout;