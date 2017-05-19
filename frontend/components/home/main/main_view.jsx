import React from 'react';
import MainHeaderContainer from './main_header_container';
import ChatListContainer from './chat/chat_list_container';
import { withRouter } from 'react-router-dom';
class MainView extends React.Component {
  render() {
    let channelDetailOpen = this.props.location.pathname.endsWith('details');
    // const channel = { channelDetailOpen ? <ChannelDetail /> : "" }
    return (
      <section id="main-view-container">
        <MainHeaderContainer />
        <ChatListContainer />
      </section>
    );
  }
}

export default MainView;
