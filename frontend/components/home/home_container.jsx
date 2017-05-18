import React from 'react';
import LeftNav from './left_nav/left_nav';
import MainHeaderContainer from './main/main_header_container';
import { Route } from 'react-router';
import MainView from './main/main_view';
//eventually going to have LeftNav, Main, and Detail Component in here only.
//MainHeader will eventually be replaced as its simply a part of the main component.
const HomeContainer = () => {
  return(
    <main className="overall-home-view">
      <LeftNav className="left-nav" />
      <Route path="/messages/:channelId" component={MainView} />
   </main>);
};

export default HomeContainer;
