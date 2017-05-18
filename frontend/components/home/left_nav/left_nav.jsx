import React from 'react';
import LeftNavHeaderContainer from './left_nav_header_container';
import ChannelListContainer from './channel_list/channel_list_container';
//eventually going to have LeftNav, Main, and Detail Component in here only.
const LeftNav = () => {
  return(
    <main className="left-nav">
      <LeftNavHeaderContainer />
      <ChannelListContainer />
   </main>);
};

export default LeftNav;
