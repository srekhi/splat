import React from 'react';
import LeftNav from './left_nav/left_nav';
import MainHeaderContainer from './main/main_header_container';
import { Route } from 'react-router';
import MainView from './main/main_view';
import DetailViewContainer from './main/detail/detail_view_container';
import { connect } from 'react-redux';
import { receiveNotification } from '../../actions/session_actions';
//eventually going to have LeftNav, Main, and Detail Component in here only.
//MainHeader will eventually be replaced as its simply a part of the main component.

//from map state to props, grab the current user,
//set Socket on his username.

const mapStateToProps = (state) => ({
  userId: state.session.currentUser.id
});

const mapDispatchToProps = (dispatch) => ({
  receiveNotification: (notification) => dispatch(receiveNotification(notification))
});

class HomeContainer extends React.Component{
  constructor(props){
    super(props);
    this.setSocket = this.setSocket.bind(this);
    this.addSocket = this.addSocket.bind(this);
    this.removeSocket = this.removeSocket.bind(this);

    this.setSocket(this.props.userId);
    //handle setting socket here.
  }

  setSocket(userId) {
    if (window.App.notificationChannel) {
      this.removeSocket();
    }
    this.addSocket(userId);
  }

  removeSocket() {
    window.App.cable.subscriptions.remove(window.App.notificationChannel);
  }

  addSocket(userId) {
    window.App.notificationChannel = window.App.cable.subscriptions.create({
      channel: 'NotificationChannel',
      user_id: userId
    }, {
      connected: () => {},
      disconnected: () => {},
      received: (data) => {
        console.log('data received');
        console.log(data);
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
// //
// const HomeContainer = () => {
//   let display;
//   return(
//     <main className="overall-home-view">
//       <LeftNav className="left-nav" />
//       <Route path="/messages/:channelId" component={MainView} />
//    </main>);
// };

// <Route exact path="/messages/:channelId/details" component={DetailViewContainer} />
