export interface Envionment {
  id: string
  environmentId: string
  name: string
  project: string
  connection: string
}

export interface Test {
  // Parent information
  project: string

  // Metadata
  id: string
  testId: string
  name: string
  maxDuration: number
  targetDuration: number
  steps: Array<(ISendAndWaitStep | ISendAndWaitForStep)>
}

export interface Event {
  project: string
  environment: string

  // Metadata
  id: number,
  name: string
  type: string
  state?: string
  originalTimestamp: string
  debugSession?: string

  // User Identity
  anonId: string
  userId?: string

  // Additional context
  context?: {[key: string]: string}

}