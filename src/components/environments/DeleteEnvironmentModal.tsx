import React, { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import Form, { FormState } from '../shared/Form';
import FormTitle from '../shared/form-elements/FormTitle';
import FormDescription from '../shared/form-elements/FormDescription';
import { Envionment } from '../types/environment';

type DeleteEnvironmentModalProps = {
  environment: Envionment
  dismiss: () => void
  confirm: () => void
}

const DeleteEnvironmentModal: React.FC<DeleteEnvironmentModalProps> = ({ children, dismiss, confirm, environment }) => {
  const [formState, setFormState] = useState<FormState>(FormState.Idle);
  const [submittionError, setSubmittionError] = useState<string>();

  const onDelete = () => {
    setFormState(FormState.Failed);
    setSubmittionError('This environment could not be deleted.')
    // confirm();
  }

  
  return <Modal onDismiss={dismiss}>
    <Form cancel={dismiss} submit={onDelete} state={formState} confirmMessage="Delete" error={submittionError}>
      { (handleChange) => (
        <>
          <FormTitle>Are you sure?</FormTitle>
          <FormDescription>{`Do you want to permanently delete "${environment.name}" and all of it's data? This is not reversible.`}</FormDescription>
        </>
      )}
    </Form>
  </Modal>
}

export default DeleteEnvironmentModal;