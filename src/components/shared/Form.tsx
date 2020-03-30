import React, { ReactNode, useState } from 'react';

import LoadingSpinner from './form-elements/LoadingSpinner';

export interface FormProps {
  cancel: () => void
  submit: (result: {[key: string]: any}) => void
  children: (onChange: (id: string, value: any) => void) => ReactNode
  state: FormState
  error?: string
  confirmMessage?: string
}

export enum FormState {
  Disabled,
  Invalid,
  Loading,
  Failed,
  Successful,
  Idle
}

const Form: React.FC<FormProps> = ({ cancel, submit, children, state, error, confirmMessage }) => {

  const [formResult, setFormResult] = useState<{[key: string]: any}>({});

  const handleChange = (id: string, value: any) => {
    formResult[id] = value;
    setFormResult(formResult)
  }
  
  return <form>
    <div>
      { children(handleChange) }
    </div>
    <div className="mt-4 border-t border-gray-200 pt-5">
      { ((state === FormState.Failed || state === FormState.Invalid) && error) ? <div className="sm:flex sm:items-start pb-4">
        <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-${state === FormState.Failed ? 'red-100': 'orange-100'} sm:mx-0 sm:h-10 sm:w-10`}>
          <svg className={`h-6 w-6 text-${state === FormState.Failed ? 'red-600': 'yellow-500'}`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            { state === FormState.Failed ? 'Sorry, something went wrong' : `Sorry, that's not quite right` }
          </h3>
          <div className="mt-2">
            <p className="text-sm leading-5 text-gray-500">
              { error }
            </p>
          </div>
        </div>
      </div> : <></> }
      <div className="flex justify-end">
        <span className="inline-flex rounded-md shadow-sm">
          <button onClick={cancel} type="button" className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
            Cancel
          </button>
        </span>
        <span className="ml-3 inline-flex rounded-md shadow-sm">
          <button disabled={state === FormState.Loading} onClick={(e) => {e.preventDefault(); submit(formResult) }} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-mesmer-600 hover:bg-mesmer-500 focus:outline-none focus:border-mesmer-700 focus:shadow-outline-mesmer active:bg-mesmer-700 transition duration-150 ease-in-out">
            { state === FormState.Loading ? <LoadingSpinner></LoadingSpinner> : ( confirmMessage ? confirmMessage : 'Save' ) }
          </button>
        </span>
      </div>
    </div>
  </form>
}

export default Form;