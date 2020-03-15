import React, { useState } from 'react';

import Form, { FormState } from '../shared/Form';
import FormSection from '../shared/form-elements/FormSection';
import FormTitle from '../shared/form-elements/FormTitle';
import FormDescription from '../shared/form-elements/FormDescription';
import FormTextField from '../shared/form-elements/FormTextField';
import { MissingParameterError } from '../../helpers/errors';
import { createEnvironment } from '../../services/environment-service';


interface NewEnvironmentProps {
  projectId: string
  dismiss: () => void
  reload: () => void
}

const NewEnvironmentForm: React.FC<NewEnvironmentProps> = ( { projectId, dismiss, reload }) => {

  const [formState, setFormState] = useState<FormState>(FormState.Idle);
  const [submittionError, setSubmittionError] = useState<string>();

  const handleSubmit = (result: {[key: string]: any}) => {
    (async () => {
      console.log('Submitting...', result);
      setFormState(FormState.Loading)

      try {
        let response = await createEnvironment(projectId, result);
        reload();

      } catch (e) {
        if (e instanceof MissingParameterError) {
          setFormState(FormState.Invalid)
          setSubmittionError(e.message)
          return;
        }

        setFormState(FormState.Failed);
        setSubmittionError(e.message);
      }  
    })()
  }

  return <Form cancel={dismiss} submit={handleSubmit} state={formState} error={submittionError}>
    {(onChange) => (
      <>
        <FormTitle>New environment</FormTitle>
        <FormDescription>Some blurb about what environments are and what they mean</FormDescription>
        <FormSection>
          <FormTextField name="Name" onChange={(value) => { onChange('name', value) }}></FormTextField>
        </FormSection>
      </>
    )}
  </Form>
}

export default NewEnvironmentForm;