import React, { useState, useEffect } from 'react';
import Form, { FormState } from '../shared/Form';
import FormDescription from '../shared/form-elements/FormDescription';
import { Environment } from '../types/environment';
import FormSelectField, { Option } from '../shared/form-elements/FormSelectField';
import { getOrganisations, getBots, getBot } from '../../services/talksuite-service';
import { MissingParameterError } from '../../helpers/errors';
import { updateEnvironment } from '../../services/environment-service';
import TalksuiteAuthenticatedFormModal from '../shared/TalksuiteAuthenticatedFormModal';

type LinkEnvironmentToBotModalProps = {
  environment: Environment
  dismiss: () => void
  confirm: () => void
}

const LinkEnvironmentToBotModal: React.FC<LinkEnvironmentToBotModalProps> = ({ dismiss, confirm, environment }) => {

  const [formState, setFormState] = useState<FormState>(FormState.Disabled);
  const [submissionError, setSubmissionError] = useState<string>();

  const [organisationOptions, setOrganisationOptions] = useState<Option[]>([])
  const [botOptions, setBotOptions] = useState<Option[]>([])

  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    (async () => {
      if (!accessToken) return;
      let organisations = await getOrganisations(accessToken);
      setOrganisationOptions(organisations.map((org: any) => ({ id: org.organisationId, name: org.organisationName })))
    })()
  }, [accessToken])

  const getBotOptionsForOrganisation = async (organisation: Option) => {
    if (!accessToken) return;
    let bots = await getBots(accessToken, organisation.id);
    setBotOptions(bots.map((bot: any) => ({ id: bot.id, name: bot.attributes.name })))
  }

  const onLink = async (result: {[key: string]: any}) => {
    if (!accessToken) return;
    setFormState(FormState.Loading);

    const { organisation, bot } = result;

    try {
      const { discoveryUrl } = await getBot(accessToken, organisation.id, bot.id);
      await updateEnvironment(environment.project, environment.environmentId, { connection: discoveryUrl })
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

  
  return <TalksuiteAuthenticatedFormModal dismiss={dismiss} confirm={confirm}>
    { (accessToken) => {
      setAccessToken(accessToken);
      return <Form cancel={dismiss} submit={onLink} state={formState} error={submissionError}>
        { (handleChange) => (
          <>
            <FormDescription>{`Please select the bot you want to connect to "${environment.name}". Please note this will NOT automatically import the required libraries.`}</FormDescription>
            <FormSelectField name="Organisation" options={organisationOptions} onChange={(value) => { handleChange('organisation', value); getBotOptionsForOrganisation(value); }}></FormSelectField>
            <FormSelectField name="Bot" options={botOptions} onChange={(value) => { handleChange('bot', value) }}></FormSelectField>
          </>
        )}
      </Form>
    }}
  </TalksuiteAuthenticatedFormModal>
}

export default LinkEnvironmentToBotModal;