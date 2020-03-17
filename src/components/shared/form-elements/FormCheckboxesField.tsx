import React, { useState, useEffect } from 'react';

export interface CheckboxOption {
  id: string
  name: string
  description?: string
  checked: boolean
}

interface FormCheckboxesFieldProps {
  name: string
  values: CheckboxOption[]
  hint?: string
  onChange: (value: CheckboxOption[]) => void
}

const FormCheckboxesField: React.FC<FormCheckboxesFieldProps> = ({ name, values = [], hint, onChange }) => {

  const [listItems, setListItems] = useState<CheckboxOption[]>([]);

  useEffect(() => {
    setListItems(values)
  }, [values])

  const handleChange = (option: CheckboxOption, event: React.ChangeEvent<HTMLInputElement>) => {
    setListItems(listItems.map((item) => {
      if (item.id === option.id) item.checked = event.target.checked;
      return item; 
    }));
    onChange(listItems);
  }

  return <fieldset className="mt-4">
    <legend className="text-base font-medium text-gray-900">
      { name }
  </legend>
    { listItems ?
      listItems.map((item) => ( 
        <div className="mt-4" key={item.id}>
          <div className="relative flex items-start">
            <div className="absolute flex items-center h-5">
              <input id="comments" type="checkbox" checked={item.checked} onChange={(event) => { handleChange(item, event) }} className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
            </div>
            <div className="pl-7 text-sm leading-5">
              <label className="font-medium text-gray-700">{item.name}</label>
              { item.description ? <p className="text-gray-500">{item.description}</p> : null }
            </div>
          </div>
        </div>
      )) : null
    }
    { hint ? <p className="mt-2 text-sm text-gray-500">{hint}</p> : <></>}
  </fieldset>


}

export default FormCheckboxesField;