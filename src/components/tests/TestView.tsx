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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { getTest, updateTest } from '../../services/test-service';
import { MissingParameterError } from '../../helpers/errors';
import { Test } from '../types/environment';
import Button from '../shared/Button';

const TestView: React.FC = () => {

  const [formState, setFormState] = useState<FormState>(FormState.Idle);
  const [submittionError, setSubmittionError] = useState<string>();

  const [project, setProject] = useState<Project>()
  const [test, setTest] = useState<Test>()

  const { projectId = '', testId = '' } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const project = await getProject(projectId);
      setProject(project);

      const test = await getTest(projectId, testId);
      setTest(test);
    })()
  }, [projectId])

  const handleSubmit = (result: {[key: string]: any}) => {
    if(!project || !test) return;
    (async () => {
      setFormState(FormState.Loading);
      try {
        const steps = result.steps;
        result.steps = undefined;
        await updateTest(project.id, test.testId, result, steps);
        history.push(`/projects/${projectId}`);

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

  return <Layout>
    <Helmet>
      <title>{`Mesmer | Edit ${test ? `"${test.name}"` : 'Test'}`}</title>
    </Helmet>
    <SkeletonTheme color="#ffe3e317" highlightColor="#ffffff29">
    <div className="py-8 bg-gray-800">
      <div className="px-8 max-w-7xl mx-auto">
        <Breadcrumbs routes={[{ name: 'Tests', route: '/tests' }, { name: project?.name, route: project?.id ? `/projects/${project.id}` : undefined }]}></Breadcrumbs>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
              { test?.name ? test.name : <Skeleton width={300}></Skeleton>}
            </h2>
          </div>
          <div className="flex-shrink-0 flex md:mt-0 md:ml-4">
            <Button colour="indigo" onClick={() => {}}>Run</Button>
          </div>
        </div>
      </div>
    </div>
    </SkeletonTheme>
    <main className="sm:px-8 max-w-7xl mx-auto md:py-8">
      <Card>
        {
          test ? <Form cancel={() => { history.goBack() }} submit={handleSubmit} state={formState} error={submittionError}>
            {(onChange) => (
              <div className="px-5">
                <FormTextField name="Name" initial={test.name} onChange={(value) => {onChange('name', value)}}></FormTextField>
                <FormTextField name="Target duration" initial={test.targetDuration} hint="This is the amount of seconds you would find acceptable for this particular test to run. If the conversation takes longer than this, the result will be rated Poor." onChange={(value) => {onChange('targetDuration', value)}}></FormTextField>
                <FormTextField name="Maximum time" initial={test.maxDuration} hint="This is the amount of seconds you would consider the maximum elapsed time for this test. If the conversation takes longer than this, the result will be rated as Failed." onChange={(value) => {onChange('maxDuration', value)}}></FormTextField>
                <FormJSONField name="Configuration" initial={test.steps} hint={<><>This is the JSON configuration for the steps for this test. </><a target="_blank" className="text-indigo-700" href="https://google.com">See here for documentation and advice.</a></>} onChange={(value) => {onChange('steps', value)}}></FormJSONField>
              </div>
            )}
          </Form> : null
        }
      </Card>
    </main>
  </Layout>
}

export default TestView;