import React, { useState, useEffect, ReactNode } from 'react';
import Modal from '../shared/Modal';
import Form, { FormState } from '../shared/Form';
import FormTitle from '../shared/form-elements/FormTitle';
import FormDescription from '../shared/form-elements/FormDescription';
import FormEmailField from '../shared/form-elements/FormEmailField';
import FormPasswordField from '../shared/form-elements/FormPasswordField';
import { getTokenForTalksuite } from '../../services/talksuite-service';
import { MissingParameterError } from '../../helpers/errors';

type TalksuiteAuthenticatedFormModalProps = {
  dismiss: () => void
  confirm: () => void
  children: (accessToken?: string) => ReactNode
}

const TalksuiteAuthenticatedFormModal: React.FC<TalksuiteAuthenticatedFormModalProps> = ({ dismiss, confirm, children }) => {
  const [loginFormState, setLoginFormState] = useState<FormState>(FormState.Idle);
  const [loginError, setLoginError] = useState<string>();
  const [accessToken, setAccessToken] = useState<string>();

  const onLogin = ({ email, password }: {[key: string]: any}) => {
    (async () => {
      setLoginFormState(FormState.Loading)

      try {
        let token = await getTokenForTalksuite(email, password);
        setAccessToken(token);
        setLoginFormState(FormState.Successful)

      } catch (e) {
        if (e instanceof MissingParameterError) {
          setLoginFormState(FormState.Invalid)
          setLoginError(e.message)
          return;
        }

        setLoginFormState(FormState.Failed);
        setLoginError(e.message);
      }  
    })()
  }

  return <Modal onDismiss={dismiss}>
    <Form cancel={dismiss} submit={onLogin} state={loginFormState} confirmMessage="Login" error={loginError}>
      { (handleChange) => (
        <>
          <FormTitle>Talksuite Login</FormTitle>
          <FormDescription>In order to perform this action, please enter your talksuite credentials below. Please note that these are never stored and are only used for this operation.</FormDescription>
          <FormEmailField name="Email" onChange={(value) => {handleChange('email', value)}}></FormEmailField>
          <FormPasswordField name="Password" onChange={(value) => {handleChange('password', value)}}></FormPasswordField>
        </>
      )}
    </Form>
    <div className={`${loginFormState !==  FormState.Successful ? 'opacity-25 pointer-events-none' : ''}  mt-5`}>
      { children(accessToken) }
    </div>
  </Modal>
}

export default TalksuiteAuthenticatedFormModal;