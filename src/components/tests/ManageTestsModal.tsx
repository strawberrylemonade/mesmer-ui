import React, { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import Form, { FormState } from '../shared/Form';
import FormTitle from '../shared/form-elements/FormTitle';
import FormDescription from '../shared/form-elements/FormDescription';
import { Envionment, Test } from '../types/environment';
import { MissingParameterError } from '../../helpers/errors';
import { getTests } from '../../services/test-service';
import FormCheckboxesField, { CheckboxOption } from '../shared/form-elements/FormCheckboxesField';
import Spinner from '../../components/shared/Spinner';
import { updateEnvironment } from '../../services/environment-service';

type ManageTestsModalProps = {
  environment: Envionment
  dismiss: () => void
  confirm: () => void
}

const ManageTestsModal: React.FC<ManageTestsModalProps> = ({ dismiss, confirm, environment }) => {

  const [formState, setFormState] = useState<FormState>(FormState.Disabled);
  const [submittionError, setSubmittionError] = useState<string>();

  const [tests, setTests] = useState<CheckboxOption[]>();

  useEffect(() => {
    (async () => {
      const activeOnEnvironmentTests = environment.tests ?? []
      const tests = await getTests(environment.project);
      setTests(tests.map((test: Test) => ({ id: test.id, name: test.name, checked: (activeOnEnvironmentTests.includes(test.id)) })))
    })()
  }, [environment])

  const saveTests = async (result: {[key: string]: any}) => {
    setFormState(FormState.Loading);
    try {
      if (result.tests) result.tests = result.tests.filter((option: {[key: string]: any}) => option.checked).map((option: {[key: string]: any}) => option.id);
      await updateEnvironment(environment.project, environment.environmentId, result);  
      confirm();

    } catch (e) {
      if (e instanceof MissingParameterError) {
        setFormState(FormState.Invalid)
        setSubmittionError(e.message)
        return;
      }

      setFormState(FormState.Failed);
      setSubmittionError(e.message);
    }  
  }

  
  return <Modal onDismiss={dismiss}>
    <Form cancel={dismiss} submit={saveTests} state={formState} confirmMessage="Save" error={submittionError}>
      { (handleChange) => (
        <>
          <FormTitle>Assign tests for uptime</FormTitle>
          <FormDescription>{`Please select from the tests below which ones you would like Mesmer to run on "${environment.name}" every 15 minuites. This will contribute to the uptime of this environment.`}</FormDescription>
          { tests ? <FormCheckboxesField name="Tests" values={tests} onChange={(value) => handleChange('tests', value)}></FormCheckboxesField> : <Spinner></Spinner> }
        </>
      )}
    </Form>
  </Modal>
}

export default ManageTestsModal;
