import React from 'react';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';

import { AzureAD } from 'react-aad-msal';
import auth from './helpers/auth';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { createBrowserHistory } from "history";

import EnvironmentView from './components/environments/EnvironmentView';
import ProjectView from './components/projects/ProjectView';
import ProjectsView from './components/projects/ProjectsView';
import TestsView from './components/tests/TestsView';
import TestView from './components/tests/TestView';
import NewTestView from './components/tests/NewTestView';
import DebugView from './components/debug/DebugView';
import ReportView from './components/report/ReportView';
import Popup from './components/shared/Popup';
import Home from './home/Home';

const browserHistory = createBrowserHistory();

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.FADE
}

function App() {
  return (
      <AlertProvider template={Popup} {...options}>
        <Router history={browserHistory}>
          <Switch>
            <Route path="/projects">
              <Switch>
                <Route path="/projects/:projectId/tests/new">
                  <NewTestView></NewTestView>
                </Route>
                <Route path="/projects/:projectId/tests/:testId">
                  <TestView></TestView>
                </Route>
                <Route path="/projects/:projectId/environments/:environmentId/reports/:reportId">
                  <ReportView></ReportView>
                </Route>
                <Route path="/projects/:projectId/environments/:environmentId/debug/:debugId">
                  <DebugView></DebugView>
                </Route>
                <Route path="/projects/:projectId/environments/:environmentId">
                  <EnvironmentView></EnvironmentView>
                </Route>
                <Route path="/projects/:projectId/environments">
                  <ProjectView></ProjectView>
                </Route>
                <Route path="/projects/:projectId">
                  <ProjectView></ProjectView>
                </Route>
                <Route path="/projects">
                  <ProjectsView></ProjectsView>
                </Route>
              </Switch>
            </Route>
            <Route path="/tests">
              <TestsView></TestsView>
            </Route>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </Router>
      </AlertProvider>
  );
}

export default App;
