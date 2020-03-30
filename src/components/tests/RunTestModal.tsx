import React, { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import Form, { FormState } from '../shared/Form';
import FormTitle from '../shared/form-elements/FormTitle';
import FormDescription from '../shared/form-elements/FormDescription';
import { Environment, Test } from '../types/environment';
import FormSelectField, { Option } from '../shared/form-elements/FormSelectField';
import { MissingParameterError } from '../../helpers/errors';
import { getTests } from '../../services/test-service';

type RunTestModalProps = {
  environment: Environment
  dismiss: () => void
  confirm: () => void
}

const RunTestModal: React.FC<RunTestModalProps> = ({ dismiss, confirm, environment }) => {

  const [formState, setFormState] = useState<FormState>(FormState.Disabled);
  const [submissionError, setSubmissionError] = useState<string>();

  const [tests, setTests] = useState<Option[]>();

  useEffect(() => {
    (async () => {
      const tests = await getTests(environment.project);
      setTests(tests.map((test: Test) => ({ id: test.id, name: test.name })))
    })()
  }, [environment])

  const startTest = async (result: {[key: string]: any}) => {
    setFormState(FormState.Loading);

    try {
      confirm();

    } catch (e) {
      if (e instanceof MissingParameterError) {
        setFormState(FormState.Invalid)
        setSubmissionError(e.message)
        return;
      }

      setFormState(FormState.Failed);
      setSubmissionError(e.message);
    }  
  }

  
  return <Modal onDismiss={dismiss}>
    <Form cancel={dismiss} submit={startTest} state={formState} confirmMessage="Run" error={submissionError}>
      { (handleChange) => (
        <>
          <FormTitle>Run a test</FormTitle>
          <FormDescription>{`Please select the test that you want to run on "${environment.name}".`}</FormDescription>
          <FormSelectField name="Test" options={tests} onChange={(value) => { handleChange('test', value) }}></FormSelectField>
        </>
      )}
    </Form>
  </Modal>
}

export default RunTestModal;