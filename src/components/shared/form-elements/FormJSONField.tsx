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
      <JSONEditor initial={initial} onChange={onChange} schema={{
  "$schema": "http://json-schema.org/draft-07/schema",
  "type": "array",
  "title": "The Root Schema",
  "description": "The root schema comprises the entire JSON document.",
  "items": {
    "$id": "#/items",
    "type": "object",
    "title": "The Items Schema",
    "description": "An explanation about the purpose of this instance.",
    "default": {},
    "required": [
      "name",
      "type"
    ],
    "properties": {
      "name": {
        "$id": "#/items/properties/name",
        "type": "string",
        "title": "The Name Schema",
        "description": "An explanation about the purpose of this instance."
      },
      "type": {
        "$id": "#/items/properties/type",
        "type": "string",
        "title": "The Type Schema",
        "description": "An explanation about the purpose of this instance.",
        "enum": ["send&Wait", "send&WaitFor", "wait&Expect"]
      },
      "message": {
        "$id": "#/items/properties/message",
        "type": "string",
        "title": "The Message Schema",
        "description": "An explanation about the purpose of this instance."
      },
      "expect": {
        "oneOf": [
          {
            "$id": "#/items/properties/expect",
            "type": "string",
            "title": "asdsad",
            "description": "asdsadsadasd"
          },
          {
            "type": "object",
            "required": [ "contentType", "content" ],
            "properties": {
              "contentType": {
                "$id": "#/items/properties/expect/contentType",
                "type": "string",
                "title": "The Message Schema"
              },
              "content": {
                "$id": "#/items/properties/expect/content",
                "type": "object",
                "title": "The Message Schema"
              }
            }
          }
        ]
      }
    }
  }
}}></JSONEditor>
      { hint ? <p className="mt-2 text-sm text-gray-500">{hint}</p> : <></>}
    </div>
  </div>


}

export default FormTextField;