import React from 'react';

import Form from './Form';

type ModalProps = {
  onDismiss: () => void
}

export enum ModalState {
  Open,
  Closed
}


const Modal: React.FC<ModalProps> = ({ children, onDismiss }) => {

  return <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center z-50 ease-in-out animation-0.2s animation-once animation-fadeIn">
    <div onClick={onDismiss} className="fixed inset-0 transition-opacity">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6 ease-in-out animation-0.2s animation-once animation-fadeUp">
      <div>
        { children }
      </div>
    </div>
  </div>
}

export default Modal;