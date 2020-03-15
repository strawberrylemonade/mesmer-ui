import React, { ReactNode } from 'react';
import JSONEditor from '../JSONEditor';

interface FormTextFieldProps {
  name: string
  initial?: any
  hint?: (string | ReactNode) 
  onChange: (value: string) => void
}

const FormTextField: React.FC<FormTextFieldProps> = ({ name, hint, onChange, initial}) => {

  return <div className="sm:grid sm:grid-cols-3 mt-4 sm:gap-4 sm:items-start">
    <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
      { name }
    </label>
    <div className="mt-1 sm:mt-0 sm:col-span-2">
      <JSONEditor initial={initial} onChange={onChange}></JSONEditor>
      { hint ? <p className="mt-2 text-sm text-gray-500">{hint}</p> : <></>}
    </div>
  </div>


}

export default FormTextField;