import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import Layout from '../Layout'; 
import FormJSONField from '../shared/form-elements/FormJSONField';
import Card from '../shared/Card';
import Form, { FormState } from '../shared/Form';
import FormTextField from '../shared/form-elements/FormTextField';
import { getProject } from '../../services/project-service';
import { Project } from '../types/project';
import Breadcrumbs from '../shared/Breadcrumbs';
import { SkeletonTheme } from 'react-loading-skeleton';
import { createTest } from '../../services/test-service';
import { MissingParameterError } from '../../helpers/errors';

const NewTestView: React.FC = () => {

  const [formState, setFormState] = useState<FormState>(FormState.Idle);
  const [submissionError, setSubmissionError] = useState<string>();
  const history = useHistory();

  const [project, setProject] = useState<Project>()

  const { projectId = '' } = useParams();

  useEffect(() => {
    (async () => {
      const project = await getProject(projectId);
      setProject(project);
    })()
  }, [projectId])

  const handleSubmit = (result: {[key: string]: any}) => {
    if(!project) return;
    (async () => {
      setFormState(FormState.Loading);
      try {
        const steps = result.steps.slice();
        result.steps = undefined;
        await createTest(project.id, result, steps);
        history.push(`/projects/${projectId}`);

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

  return <Layout>
    <Helmet>
      <title>{`Mesmer | New Test`}</title>
    </Helmet>
    <SkeletonTheme color="#ffe3e317" highlightColor="#ffffff29">
    <div className="py-8 bg-mesmer-800">
      <div className="px-8 max-w-7xl mx-auto">
        <Breadcrumbs routes={[{ name: 'Tests', route: '/tests' }, { name: project?.name, route: project?.id ? `/projects/${project.id}` : undefined }]}></Breadcrumbs>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
              New Test
            </h2>
          </div>
        </div>
      </div>
    </div>
    </SkeletonTheme>
    <main className="sm:px-8 max-w-7xl mx-auto md:py-8">
      <Card>
        <Form cancel={() => { history.goBack() }} submit={handleSubmit} state={formState} error={submissionError}>
          {(onChange) => (
            <div className="px-5">
              <FormTextField name="Name" onChange={(value) => {onChange('name', value)}}></FormTextField>
              <FormTextField name="Target duration" hint="This is the amount of seconds you would find acceptable for this particular test to run. If the conversation takes longer than this, the result will be rated Poor." onChange={(value) => {onChange('targetDuration', value)}}></FormTextField>
              <FormTextField name="Maximum time" hint="This is the amount of seconds you would consider the maximum elapsed time for this test. If the conversation takes longer than this, the result will be rated as Failed." onChange={(value) => {onChange('maxDuration', value)}}></FormTextField>
              <FormJSONField initial={[]} name="Configuration" hint={<><>This is the JSON configuration for the steps for this test. </><a target="_blank" className="text-mesmer-700" href="https://google.com">See here for documentation and advice.</a></>} onChange={(value) => {onChange('steps', value)}}></FormJSONField>
            </div>
          )}
        </Form>
      </Card>
    </main>
  </Layout>
}

export default NewTestView;