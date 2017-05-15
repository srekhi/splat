import Navbar from './nav_bar/nav_bar';
import SessionFormContainer from './session_form/session_form_container';
import VideoBackground from './video_background';
import React from 'react';

const SplashPage = () => (
  <main>
    <Navbar />
    <SessionFormContainer />
    <VideoBackground />
  </main>
);

export default SplashPage;
