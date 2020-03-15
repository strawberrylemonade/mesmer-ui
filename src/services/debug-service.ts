import { MissingParameterError } from '../helpers/errors';
import { get, post } from './client';

export const getDebugSession = async (projectId: string, environmentId: string, debugId: string) => {
  try {
    const debugSession = await get(`/projects/${projectId}/environments/${environmentId}/debug/${debugId}`);
    return debugSession;
  } catch (e) {
    console.log(e);
  }
}

export const createDebugSession = async (projectId: string, environmentId: string) => {
  try {
    const debugSession = await post(`/projects/${projectId}/environments/${environmentId}/debug`);
    return debugSession;
  } catch (e) {
    console.log(e);
  }
}