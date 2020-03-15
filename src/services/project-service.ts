import { MissingParameterError } from '../helpers/errors';
import { get, post } from './client';

interface IProject {
  // Metadata
  id: string
  name: string
}

export const createProject = async (project: Partial<IProject>) => {

  if (!project.name) throw new MissingParameterError('name');
  project.id = project.name.replace(' ', '-').replace(/(\W)/g, '').toLowerCase();

  try {
    const response = await post(`/projects`, project);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const getProjects = async () => {
  try {
    const environments = await get(`/projects`);
    return environments;
  } catch (e) {
    console.log(e);
  }
}

export const getProject = async (projectId: string) => {
  try {
    const project = await get(`/projects/${projectId}`);
    return project;
  } catch (e) {
    console.log(e);
  }
}

export const updateProject = async (projectId: string, candidateProject: Partial<IProject>) => {
  try {

  } catch (e) {
    console.log(e);  }
}