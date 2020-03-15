import React from 'react';

const FormDescription: React.FC = ( {children}) => {

  return <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
    {children}
  </p>


}

export default FormDescription;