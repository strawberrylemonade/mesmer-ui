import React, { useState, useEffect, useRef } from 'react';
import Editor, { monaco, EditorDidMount } from '@monaco-editor/react';

interface JSONEditorProps {
  initial: any
  onChange: (value: string) => void
  schema?: any
}

const JSONEditor: React.FC<JSONEditorProps> = ({ onChange, initial, schema }) => {

  const [editorState, setEditorState] = useState<string | undefined>(JSON.stringify(initial, null, 2))
  const editorRef = useRef<any>();

  const handleChange = () => {
    const value = editorRef.current.getValue();
    setEditorState(value);
    if (value) onChange(value);
  }

  const handleEditorDidMount: EditorDidMount = (_, editor) => {
    editorRef.current = editor;
    editorRef.current.onDidChangeModelContent(handleChange);
  }

  useEffect(() => {
    (async () => {
      const m = await monaco.init()
      if (!schema) {
        m.languages.json.jsonDefaults.setDiagnosticsOptions({});
        return;
      }

      m.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [{
            fileMatch: ['*'],
            schema: schema
        }]
      })  
    })()
  }, [schema])
  

  return <div className="mb-3 md:mb-8 h-100">
    <div className="h-full form-input rounded-md shadow-sm">
      <Editor language="json" editorDidMount={handleEditorDidMount} value={editorState}></Editor>
    </div>
  </div>
}

export default JSONEditor;