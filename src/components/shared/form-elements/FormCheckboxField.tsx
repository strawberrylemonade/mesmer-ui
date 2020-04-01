import React, { useState } from 'react';

interface FormCheckboxFieldProps {
  name: string
  initial?: boolean
  hint?: string
  onChange: (value: boolean) => void
}

const FormCheckboxField: React.FC<FormCheckboxFieldProps> = ({ name, initial = false, hint, onChange }) => {

  const [fieldState, setFieldState] = useState<boolean>(initial);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldState(event.target.checked)
    onChange(event.target.checked)
  }

  return <div className="sm:grid sm:grid-cols-3 mt-4 sm:gap-4 sm:items-start">
    <label htmlFor={name} className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
      { name }
    </label>
    <div className="mt-1 sm:mt-0 sm:col-span-2">
      <div>
        <input id="comments" type="checkbox" checked={fieldState} onChange={(event) => { handleChange(event) }} className="form-checkbox h-4 w-4 text-mesmer-600 transition duration-150 ease-in-out" />
      </div>
      { hint ? <p className="mt-2 text-sm text-gray-500">{hint}</p> : <></>}
    </div>
  </div>
}

export default FormCheckboxField;