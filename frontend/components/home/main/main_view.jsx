import React from 'react';
import MainHeaderContainer from './main_header_container';
import ChatListContainer from './chat/chat_list_container';
class MainView extends React.Component {
  render() {
    return (
      <section id="main-view-container">
        <MainHeaderContainer />
        <ChatListContainer />
      </section>
    );
  }
}

export default MainView;
