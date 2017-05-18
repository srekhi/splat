import React from 'react';
import LeftNav from './left_nav/left_nav';
import MainHeaderContainer from './main/main_header_container';
import { Route } from 'react-router';

//eventually going to have LeftNav, Main, and Detail Component in here only.
const HomeContainer = () => {
  return(
    <main className="main-view">
      <LeftNav className="left-nav" />
      <Route path="/messages/:channelId" component={MainHeaderContainer} />
   </main>);
};

export default HomeContainer;
