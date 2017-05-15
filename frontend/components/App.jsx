import React from 'react';
import SessionFormContainer from './session_form/session_form_container';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomeContainer from '../components/home/home_container.jsx';

const App = () => (
  <div>
    <header>
      <h1>Sp</h1>
    </header>
    <AuthRoute path="/signup" component={SessionFormContainer} />
    <AuthRoute path="/login" component={SessionFormContainer} />
    <ProtectedRoute exact path="/" component={ HomeContainer } />
  </div>
);

export default App;
