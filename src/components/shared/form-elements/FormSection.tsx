import React from 'react';

const FormSection: React.FC = ( {children}) => {

  return <div className="mt-4 border-t border-gray-200 sm:mt-5">
    {children}
  </div>
}

export default FormSection;