import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';

interface JSONViewerProps {
  value: any
}

const JSONViewer: React.FC<JSONViewerProps> = ({ value }) => {

  const editorContent = JSON.stringify(value, null, 2) ?? '';
  
  return <div className={`mb-3 md:mb-8 h-100 ${editorContent ? '' : 'hidden'}`}>
    <div className="h-full form-input rounded-md shadow-sm">
      <ControlledEditor language="json" options={{ readOnly: true }} value={editorContent}></ControlledEditor>
    </div>
  </div>
}

export default JSONViewer;