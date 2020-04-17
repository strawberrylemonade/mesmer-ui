import { get } from './client';
import { IEvent } from '../components/types/environment'

export enum ReportStatus {
  Good = 'Good',
  Poor = 'Poor',
  Bad = 'Bad'
}

export interface IStepReport {
  name: string
  duration: number
  started: Date
  ended: Date
  status: ReportStatus
  comment: string
}


export interface IReport {
  // Parent information
  project: string
  environment: string
  test: string

  // Metadata
  id: string
  debugSession: string
  status: ReportStatus
  duration: number
  steps: IStepReport[]

  events?: IEvent[]
}

export const getReports = async () => {
  const environments = await get(`/projects`);
  return environments;
}

export const getReport = async (projectId: string, environmentId: string, reportId: string) => {
  const report = await get(`/projects/${projectId}/environments/${environmentId}/reports/${reportId}`);
  return report;
}

export const getRecentReport = async (projectId: string, environmentId: string) => {
  const report = await get(`/projects/${projectId}/environments/${environmentId}/reports/recent`);
  return report;
}

export const getRecentReports = async (projectId: string, environmentId: string) => {
  const reports = await get(`/projects/${projectId}/environments/${environmentId}/reports/recents`);
  return reports;
}