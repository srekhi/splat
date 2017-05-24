import React from 'react';
import MainHeaderContainer from './main_header_container';
import ChatListContainer from './chat/chat_list_container';
import { withRouter } from 'react-router-dom';
import { fetchNotifications } from '../../../actions/session_actions';
import { connect } from 'react-redux';
const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  fetchNotifications: (userId) => dispatch(fetchNotifications(userId))
});

class MainView extends React.Component {

  componentWillMount(){
    //fetch notifications here for current user
    let currentUserId = this.props.currentUser.id;
    this.props.fetchNotifications(currentUserId);
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
