import React, { useState } from 'react';

import Form, { FormState } from '../shared/Form';
import FormSection from '../shared/form-elements/FormSection';
import FormTitle from '../shared/form-elements/FormTitle';
import FormDescription from '../shared/form-elements/FormDescription';
import FormTextField from '../shared/form-elements/FormTextField';
import { createProject } from '../../services/project-service';
import { MissingParameterError } from '../../helpers/errors';


interface NewProjectForm {
  dismiss: () => void
  reload: () => void
}

const NewProjectForm: React.FC<NewProjectForm> = ( { dismiss, reload }) => {

  const [formState, setFormState] = useState<FormState>(FormState.Idle);
  const [submissionError, setSubmissionError] = useState<string>();

  const handleSubmit = (result: {[key: string]: any}) => {
    (async () => {
      console.log('Submitting...', result);
      setFormState(FormState.Loading)
      
      try {
        let response = await createProject(result);
        reload();

      } catch (e) {
        if (e instanceof MissingParameterError) {
          setFormState(FormState.Invalid)
          setSubmissionError(e.message)
          return;
        }

        setFormState(FormState.Failed);
        setSubmissionError(e.message);
      }  
    })()
  }

  return <Form cancel={dismiss} submit={handleSubmit} state={formState} error={submissionError}>
    {(onChange) => (
      <>
        <FormTitle>New project</FormTitle>
        <FormDescription>Some blurb about what projects are and what they mean</FormDescription>
        <FormSection>
          <FormTextField name="Name" onChange={(value) => { onChange('name', value) }}></FormTextField>
        </FormSection>
      </>
    )}
  </Form>
}

export default NewProjectForm;