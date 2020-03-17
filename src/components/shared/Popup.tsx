import React from 'react';
import { AlertComponentProps } from 'react-alert';

import { TiWarning } from 'react-icons/ti'

const Popup: React.FC<AlertComponentProps> = ({ message, options, close }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 pointer-events-auto">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="py-2 px-4 rounded-lg bg-red-600 shadow-lg sm:p-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-red-800">
                <TiWarning fill="white"></TiWarning>
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span>
                  {message}
                </span>
              </p>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button onClick={close} type="button" className="-mr-1 flex p-2 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500 transition ease-in-out duration-150 cursor-pointer">
                <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Popup;