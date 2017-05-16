import NavbarComponent from './nav_bar/nav_bar_component';
import SessionFormContainer from './session_form/session_form_container';
import VideoBackground from './video_background';
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';


const SplashPage = () => (
  <main>
    <NavbarComponent />
    <AuthRoute path="/signup" component={SessionFormContainer} />
    <AuthRoute path="/login" component={SessionFormContainer} />
    <VideoBackground />
  </main>
);

export default SplashPage;
