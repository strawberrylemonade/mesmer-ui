import React, { useState, useEffect } from 'react';
import Button from '../shared/Button';

const Alert: React.FC = () => {

  return <div className="bg-gray-50 sm:rounded-lg">
    <div className="px-4 py-5 sm:p-6 flex flex-col sm:flex-row">
      <div className="flex-grow">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Need more bandwidth?
        </h3>
        <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus praesentium tenetur pariatur.
          </p>
        </div>
      </div>
      <div className="mt-5 flex justify-center sm:justify-right">
        <span>
          <Button colour="mesmer">See report</Button>
          <Button>Dismiss</Button>
        </span>
      </div>
    </div>
  </div>
}

export default Alert;