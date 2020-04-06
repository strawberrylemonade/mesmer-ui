import React, { useState, useEffect } from 'react';

interface FormSelectFieldProps {
  name: string
  options?: Option[]
  hint?: string
  initial?: Option
  onChange: (value: Option) => void
}

export interface Option {
  id: string
  name: string
}

const FormSelectField: React.FC<FormSelectFieldProps> = ({ name, hint, options = [], onChange, initial }) => {

  const [selectedOption, setSelectedOption] = useState<Option>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const [option] = options.filter((option) => option.id === selectedValue);
    if (!option) return;
    setSelectedOption(option)
    onChange(option);
  }

  useEffect(() => {
    if (initial) setSelectedOption(initial);
  }, [initial])

  useEffect(() => {
    const [option] = options;
    if(selectedOption || !option) return;
    setSelectedOption(option)
    onChange(option);
  }, [options])
  
  return <div className="sm:grid sm:grid-cols-3 mt-4 sm:gap-4 sm:items-start">
    <label htmlFor={name} className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
      { name }
    </label>
    <div className="mt-1 sm:mt-0 sm:col-span-2">
      <div className="rounded-md shadow-sm">
        <select id={name} onChange={handleChange} value={selectedOption?.id} className="block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
          { options.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))
          }
        </select>
      </div>
      { hint ? <p className="mt-2 text-sm text-gray-500">{hint}</p> : <></>}
    </div>
  </div>
}

export default FormSelectField;