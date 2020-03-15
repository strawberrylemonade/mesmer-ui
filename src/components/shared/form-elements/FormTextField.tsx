import React, { useState } from 'react';

interface FormTextFieldProps {
  name: string
  initial?: any
  hint?: string
  onChange: (value: string) => void
}

const FormTextField: React.FC<FormTextFieldProps> = ({ name, initial, hint, onChange }) => {

  const [fieldState, setFieldState] = useState<string>(initial ? initial : '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldState(event.target.value)
    onChange(event.target.value)
  }

  return <div className="sm:grid sm:grid-cols-3 mt-4 sm:gap-4 sm:items-start">
    <label htmlFor={name} className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
      { name }
    </label>
    <div className="mt-1 sm:mt-0 sm:col-span-2">
      <div className="rounded-md shadow-sm">
        <input onChange={handleChange} id={name} value={fieldState} className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
      </div>
      { hint ? <p className="mt-2 text-sm text-gray-500">{hint}</p> : <></>}
    </div>
  </div>


}

export default FormTextField;