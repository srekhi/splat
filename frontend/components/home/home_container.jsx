import React from 'react';
import LeftNav from './left_nav/left_nav';
import MainHeaderContainer from './main/main_header_container';
import { Route } from 'react-router';
import MainView from './main/main_view';
import DetailViewContainer from './main/detail/detail_view_container';
import { connect } from 'react-redux';
import { receiveNotification } from '../../actions/session_actions';
import { receiveChannel } from '../../actions/channel_actions';
//eventually going to have LeftNav, Main, and Detail Component in here only.
//MainHeader will eventually be replaced as its simply a part of the main component.

//from map state to props, grab the current user,
//set Socket on his username.

const mapStateToProps = (state) => ({
  userId: state.session.currentUser.id
});

const mapDispatchToProps = (dispatch) => ({
  receiveNotification: (notification) => dispatch(receiveNotification(notification)),
  receiveChannel: (channel) => dispatch(receiveChannel(channel))
});

class HomeContainer extends React.Component{
  constructor(props){
    super(props);
    this.setNotificationsSocket = this.setNotificationsSocket.bind(this);
    this.addNotificationsSocket = this.addNotificationsSocket.bind(this);
    this.removeNotificationsSocket = this.removeNotificationsSocket.bind(this);

    // channel listener socket:
    this.setChannelListSocket = this.setChannelListSocket.bind(this);
    this.addChannelListSocket = this.addChannelListSocket.bind(this);
    this.removeChannelListSocket = this.removeChannelListSocket.bind(this);

    this.setNotificationsSocket(this.props.userId);
    this.setChannelListSocket(this.props.userId);
    //handle setting socket here.
  }

  // channel-list
  setChannelListSocket(userId) {
    if (window.App.messageChannel) {
      this.removeChannelListSocket();
    }
    this.addChannelListSocket(userId);
  }

  removeChannelListSocket() {
    window.App.cable.subscriptions.remove(window.App.messageChannel);
  }

  addChannelListSocket(userId) {
    window.App.messageChannel = window.App.cable.subscriptions.create({
      channel: 'MessageChannel',
      user_id: userId
    }, {
      connected: () => {},
      disconnected: () => {},
      received: (data) => {
        this.props.receiveChannel(data.channel);
      }
    });
  }


  setNotificationsSocket(userId) {
    if (window.App.notificationChannel) {
      this.removeNotificationsSocket();
    }
    this.addNotificationsSocket(userId);
  }

  removeNotificationsSocket() {
    window.App.cable.subscriptions.remove(window.App.notificationChannel);
  }

  addNotificationsSocket(userId) {
    window.App.notificationChannel = window.App.cable.subscriptions.create({
      channel: 'NotificationChannel',
      user_id: userId
    }, {
      connected: () => {},
      disconnected: () => {},
      received: (data) => {
        this.props.receiveNotification(data.notification);
      }
    });
  }

  render(){
    let display;
    return(
      <main className="overall-home-view">
        <LeftNav className="left-nav" />
        <Route path="/messages/:channelId" component={MainView} />
     </main>);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
