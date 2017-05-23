import React from 'react';
import LeftNavHeaderContainer from './left_nav_header_container';
import ChannelListContainer from './channel_list/channel_list_container';
import AboutMe from './about_me.jsx';
//eventually going to have LeftNav, Main, and Detail Component in here only.
const LeftNav = () => {
  return(
    <main className="left-nav">
      <LeftNavHeaderContainer />
      <ChannelListContainer />
      <AboutMe />
   </main>);
};

export default LeftNav;
