import { MissingParameterError } from '../helpers/errors';
import { get, post, put } from './client';

interface ITest {
  // Parent information
  project: string

  // Metadata
  id: string
  testId: string
  name: string
  maxDuration: number
  targetDuration: number
  steps: any[]
}

export const createTest = async (projectId: string, test: Partial<ITest>, steps: string) => {
  if (!test.name) throw new MissingParameterError('name');
  test.testId = test.name.replace(' ', '-').replace(/\W/g, '').toLowerCase();

  if (!test.maxDuration) throw new MissingParameterError('maxDuration');
  if (!test.targetDuration) throw new MissingParameterError('targetDuration');
  if (!steps) throw new MissingParameterError('steps');

  test.steps = JSON.parse(steps)
  
  const response = await post(`/projects/${projectId}/tests`, test);
  return response;
}

export const getTests = async (projectId: string) => {
  const environments = await get(`/projects/${projectId}/tests`);
  return environments;
}

export const getTest = async (projectId: string, testId: string) => {
  const test = await get(`/projects/${projectId}/tests/${testId}`);
  return test;
}

export const updateTest = async (projectId: string, testId: string, candidateTest: Partial<ITest>, steps: string) => {
  if (steps) candidateTest.steps = JSON.parse(steps);
  const response = await put(`/projects/${projectId}/tests/${testId}`, candidateTest);
  return response;
}