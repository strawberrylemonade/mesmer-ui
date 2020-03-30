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
  try {
    const environments = await get(`/projects`);
    return environments;
  } catch (e) {
    console.log(e);
  }
}

export const getReport = async (projectId: string, environmentId: string, reportId: string) => {
  try {
    const report = await get(`/projects/${projectId}/environments/${environmentId}/reports/${reportId}`);
    return report;
  } catch (e) {
    console.log(e);
  }
}

export const getRecentReport = async (projectId: string, environmentId: string) => {
  try {
    const report = await get(`/projects/${projectId}/environments/${environmentId}/reports/recent`);
    return report;
  } catch (e) {
    console.log(e);
  }

}

export const getRecentReports = async (projectId: string, environmentId: string) => {
  try {
    const reports = await get(`/projects/${projectId}/environments/${environmentId}/reports/recents`);
    return reports;
  } catch (e) {
    console.log(e);
  }

}