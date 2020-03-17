import React from 'react';

import spinner from '../../assets/loading.svg';

const Spinner: React.FC = () => {

  return <div className="flex h-16 justify-center items-center">
    <img className="h-16 w-16 m-6" src={spinner}></img>
  </div>
} 

export default Spinner;