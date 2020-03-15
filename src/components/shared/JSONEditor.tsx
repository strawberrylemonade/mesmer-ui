import React, { useState } from 'react';
import { ControlledEditorOnChange, ControlledEditor } from '@monaco-editor/react';

interface JSONEditorProps {
  initial: any
  onChange: (value: string) => void
}

const JSONEditor: React.FC<JSONEditorProps> = ({ onChange, initial }) => {

  const [editorState, setEditorState] = useState<string | undefined>(JSON.stringify(initial, null, 2))

  const handleChange: ControlledEditorOnChange = (event, value) => {
    setEditorState(value);
    if (value) onChange(value);
  }

  return <div className="mb-3 md:mb-8 h-100">
    <div className="h-full form-input rounded-md shadow-sm">
      <ControlledEditor language="json" onChange={handleChange} options={{}} value={editorState}></ControlledEditor>
    </div>
  </div>
}

export default JSONEditor;