import { MissingParameterError } from '../helpers/errors';
import { get, post, put } from './client';

export interface IEnvironment {
  // Parent information
  project: string

  // Metadata
  environmentId: string
  name: string
  connection: string
}

export const createEnvironment = async (projectId: string, environment: Partial<IEnvironment>) => {

  if (!projectId) throw new MissingParameterError('projectId');
  if (!environment.name) throw new MissingParameterError('name');
  environment.environmentId = environment.name.replace(' ', '-').replace(/\W/g, '').toLowerCase();

  // Confirm that project exists
  try {
    const response = await post(`/projects/${projectId}/environments`, environment);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const getEnvironments = async (projectId: string) => {
  try {
    const environments = await get(`/projects/${projectId}/environments`);
    return environments;
  } catch (e) {
    console.log(e);
  }
}

export const getEnvironment = async (projectId: string, environmentId: string) => {
  try {
    const environment = await get(`/projects/${projectId}/environments/${environmentId}`);
    return environment;
  } catch (e) {
    console.log(e);
  }
}

export const updateEnvironment = async (projectId: string, environmentId: string, candidateEnvironment: Partial<IEnvironment>) => {
  try {
    const environment = await put(`/projects/${projectId}/environments/${environmentId}`, candidateEnvironment);
    return environment;
  } catch (e) {
    console.log(e);  }
}