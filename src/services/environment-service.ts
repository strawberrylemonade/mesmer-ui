import { MissingParameterError } from '../helpers/errors';
import { get, post, put } from './client';

export interface IEnvironment {
  // Parent information
  project: string

  // Metadata
  environmentId: string
  name: string
  connection: string
  slack: string
}

export const createEnvironment = async (projectId: string, environment: Partial<IEnvironment>) => {

  if (!projectId) throw new MissingParameterError('projectId');
  if (!environment.name) throw new MissingParameterError('name');
  environment.environmentId = environment.name.replace(' ', '-').replace(/\W/g, '').toLowerCase();

  // Confirm that project exists
  const response = await post(`/projects/${projectId}/environments`, environment);
  return response;
}

export const getEnvironments = async (projectId: string) => {
  const environments = await get(`/projects/${projectId}/environments`);
  return environments;
}

export const getEnvironment = async (projectId: string, environmentId: string) => {
  const environment = await get(`/projects/${projectId}/environments/${environmentId}`);
  return environment;
}

export const updateEnvironment = async (projectId: string, environmentId: string, candidateEnvironment: Partial<IEnvironment>) => {
  const environment = await put(`/projects/${projectId}/environments/${environmentId}`, candidateEnvironment);
  return environment;
}

export const getEnvironmentStatus = async (projectId: string, environmentId: string) => {
  const status = await get(`/projects/${projectId}/environments/${environmentId}/status`);
  return status;
}