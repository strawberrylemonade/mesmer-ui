import React, { useState, useEffect } from 'react';
import { Environment } from '../types/environment';
import { Project } from '../types/project';
import Modal from '../shared/Modal';
import Form, { FormState } from '../shared/Form';
import FormSection from '../shared/form-elements/FormSection';
import FormTitle from '../shared/form-elements/FormTitle';
import FormDescription from '../shared/form-elements/FormDescription';
import Button from '../shared/Button';
import FormSelectField, { Option } from '../shared/form-elements/FormSelectField';
import { getProjects } from '../../services/project-service';
import { getEnvironments } from '../../services/environment-service';
import { createDebugSession } from '../../services/debug-service';

type StartOrJoinDebugSessionModalProps = {
  project?: Project
  environment?: Environment
  showChoices?: boolean
  dismiss: () => void
  confirm: (projectId: string, environmentId: string, debugSessionId: string) => void
}
 
const StartOrJoinDebugSessionModal: React.FC<StartOrJoinDebugSessionModalProps> = ({ project, environment, dismiss, confirm, showChoices = true }) => {

  const [code, setCode] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Option>();
  const [selectedEnvironment, setSelectedEnvironment] = useState<Option>();

  const [projectOptions, setProjectOptions] = useState<Option[]>([]);
  const [environmentOptions, setEnvironmentOptions] = useState<Option[]>([]);
  
  useEffect(() => {
    (async () => {
      if (project) { 
        const selectedOption = { name: project.name, id: project.id };
        setSelectedProject(selectedOption);
        await handleProjectChange(selectedOption);
      }
      if (environment) setSelectedEnvironment({ name: environment.name, id: environment.environmentId });
  
      const projects = await getProjects();
      const options = projects.map((project: Project) => ({ name: project.name, id: project.id }))
      setProjectOptions(options);

      const [option] = options;
      if ((selectedProject || project) || !option) return;
      setSelectedProject(option);
    })()
  }, [])

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }

  const handleProjectChange = async (selectedProjectOption: Option) => {
    const environments = await getEnvironments(selectedProjectOption.id);
    const options = environments.map((environment: Environment) => ({ name: environment.name, id: environment.environmentId }))
    setEnvironmentOptions(options);

    const [option] = options;
    setSelectedEnvironment(option);
  }

  const handleEnvironmentChange = (option: Option) => {
    setSelectedEnvironment(option);
  }

  const startDebugSession = async () => {
    if (!selectedProject || !selectedEnvironment) return;
    const session = await createDebugSession(selectedProject.id, selectedEnvironment.id);
    confirm(selectedProject.id, selectedEnvironment.id, session.id);
  }

  const joinDebugSession = async () => {
    if (!selectedProject || !selectedEnvironment) return;
    const session = await createDebugSession(selectedProject.id, selectedEnvironment.id);
    confirm(selectedProject.id, selectedEnvironment.id, session.id);
  }

  return <Modal onDismiss={dismiss}>
    <FormTitle>Start or join a debug session</FormTitle>
    <FormDescription>A debug session</FormDescription>
    { showChoices ? <>
      <FormSelectField name="Project" initial={selectedProject} options={projectOptions} onChange={(value) => handleProjectChange(value)}></FormSelectField>
      <FormSelectField name="Environment" initial={selectedEnvironment} options={environmentOptions} onChange={(value) => handleEnvironmentChange(value)}></FormSelectField>
      <FormSection></FormSection>
    </> : null }
    <div className="flex flex-col justify-center items-center mt-5">
      <Button colour="mesmer" onClick={startDebugSession}>Create new debug session</Button>
      <p className="m-2 max-w-2xl text-sm leading-5 text-gray-500">or</p>
      <div className="inline-flex">
        <div className="rounded-md shadow-sm">
          <input placeholder="Existing debug code" onChange={handleCodeChange} value={code} className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
        </div>
        <Button colour="mesmer" disabled={!code} onClick={joinDebugSession}>Join</Button>
      </div>
    </div>
  </Modal>;
}

export default StartOrJoinDebugSessionModal;