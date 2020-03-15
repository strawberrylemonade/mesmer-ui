import React from 'react';
import {
  Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { Helmet } from 'react-helmet';

import { AzureAD } from 'react-aad-msal';
import auth from './helpers/auth';

import { ApplicationInsights, DistributedTracingModes } from '@microsoft/applicationinsights-web';
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";

import EnvionmentView from './components/environments/EnvironmentView';
import ProjectView from './components/projects/ProjectView';
import ProjectsView from './components/projects/ProjectsView';
import Layout from './components/Layout';
import Projects from './components/projects/Projects';
import TestsView from './components/tests/TestsView';
import TestView from './components/tests/TestView';
import NewTestView from './components/tests/NewTestView';
import DebugView from './components/debug/DebugView';

const browserHistory = createBrowserHistory();

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: 'f3c75b99-b1f7-4c66-b554-4d646e8032fd',
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: { history: browserHistory }
        },
        appId: 'mesmer-ui',
        enableRequestHeaderTracking: true,
        disableFetchTracking: false,
        disableCorrelationHeaders : false, 
        enableCorsCorrelation: true,
        enableAutoRouteTracking: true,
        distributedTracingMode : DistributedTracingModes.AI
    }
});
appInsights.loadAppInsights();

function App() {
  return (
    <AzureAD provider={auth} forceLogin={true}>
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
              <Route path="/projects/:projectId/environments/:environmentId/debug/:debugId">
                <DebugView></DebugView>
              </Route>
              <Route path="/projects/:projectId/environments/:environmentId">
                <EnvionmentView></EnvionmentView>
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
            <Layout>
              <Helmet>
                <title>Mesmer</title>
              </Helmet>
              <Projects></Projects>
            </Layout>
          </Route>
        </Switch>
      </Router>
    </AzureAD>
  );
}

export default withAITracking(reactPlugin, App);
