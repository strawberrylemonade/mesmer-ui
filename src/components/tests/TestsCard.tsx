import React, { useEffect, useState } from 'react';
import { Project } from '../types/project';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { getEnvironments } from '../../services/environment-service';
import { Test } from '../types/environment';
import Model, { ModalState } from '../shared/Modal';
import ListItem from '../shared/list-elements/ListItem';
import NewEnvironmentForm from '../environments/NewEnvironmentForm';
import List from '../shared/List';
import Button from '../shared/Button';
import { getTests } from '../../services/test-service';

type TestsCardProps = {
  project?: Project
}

const TestsCard: React.FC<TestsCardProps> = ({ project }) => {

  const [tests, setTests] = useState<Test[]>()

  useEffect(() => {
    (async () => {
      if(!project) return;
      const tests = await getTests(project.id);
      setTests(tests);
    })()
  }, [project])

  return <>
      <List title={project?.name} link={`/projects/${project?.id}/tests`} actions={
        <Button colour="mesmer" to={`/projects/${project?.id}/tests/new`}>New test</Button>
      }>
        { (tests && project) ? tests.map((test) => (
          <Link key={test.id} to={`/projects/${project.id}/tests/${test.testId}`}>
            <ListItem>
              <div>
                <div className="text-md leading-5 font-medium text-mesmer-600 truncate">
                  {test.name}
                </div>
                <div className="mt-2 flex">
                  <div className="flex items-center text-sm leading-5 text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 100 100">
                      <path d="m50 1.043c-27.082 0-48.957 21.875-48.957 48.957s21.875 48.957 48.957 48.957 48.957-21.875 48.957-48.957-21.875-48.957-48.957-48.957zm4.168 48.957c0 1.457-0.83203 2.918-2.082 3.543l-24.586 13.125c-0.625 0.41797-1.25 0.41797-1.875 0.41797-1.457 0-2.918-0.83203-3.543-2.082-1.043-2.082-0.41797-4.375 1.668-5.625l22.082-11.879v-15.832c0-2.293 1.875-4.168 4.168-4.168s4.168 1.875 4.168 4.168z"/>
                    </svg>
                    <span>
                      Last tested: 20 mins ago
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-5 flex-shrink-0">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
            </ListItem>
          </Link>
        )) : <ListItem>
          <div>
            <div className="text-md leading-5 font-medium text-mesmer-600 truncate">
              <Skeleton width={100}></Skeleton>
            </div>
            <div className="mt-2 flex">
              <div className="flex items-center text-sm leading-5 text-gray-500">
                <svg className="flex-shrink-0 mr-1.5 h-4 w-4  text-gray-400" fill="currentColor" viewBox="0 0 100 100">
                  <path d="m50 1.043c-27.082 0-48.957 21.875-48.957 48.957s21.875 48.957 48.957 48.957 48.957-21.875 48.957-48.957-21.875-48.957-48.957-48.957zm4.168 48.957c0 1.457-0.83203 2.918-2.082 3.543l-24.586 13.125c-0.625 0.41797-1.25 0.41797-1.875 0.41797-1.457 0-2.918-0.83203-3.543-2.082-1.043-2.082-0.41797-4.375 1.668-5.625l22.082-11.879v-15.832c0-2.293 1.875-4.168 4.168-4.168s4.168 1.875 4.168 4.168z"/>
                </svg>
                <span>
                  <Skeleton width={130}></Skeleton>
                </span>
              </div>
            </div>
          </div>
        </ListItem> }
      </List>
  </>
}

export default TestsCard;