import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomeContainer from './home/home_container.jsx';
import SplashPage from './splash_page/splash_page';
const App = () => (
  <div>
    <AuthRoute path="/signup" component={SplashPage} />
    <AuthRoute path="/login" component={SplashPage} />
    <ProtectedRoute exact path="/" component={ HomeContainer } />
  </div>
);

export default App;
