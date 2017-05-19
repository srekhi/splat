import React from 'react';
import { withRouter } from 'react-router';

class MainHeader extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const channelId = this.props.match.params.channelId;
    this.props.fetchChannels(this.props.user.id);
    // this.props.fetchUserCount(channelId);

  }

  componentWillReceiveProps(newProps){
    // console.log(newProps.channel);
    // console.log(this.props.channel);
    // if (!!this.props.channel && this.props.channel.id !== newProps.channel.id) {
    //   newProps.fetchUserCount(newProps.channel.id);
    //   }
    }

  render(){
    if (this.props.channel === undefined) return <header>Loading..</header>;
    let channelName = "#" + this.props.channel.name;
    let usernames = [];
    if (this.props.channel.private === true ) {
      for (var i = 0; i < this.props.channel.users.length; i++) {
        let user = this.props.channel.users[i];
        if (user.username === this.props.user.username && this.props.channel.users.length !== 1) {
          continue;
        }
        usernames.push(user.username);
      }
      usernames[0] = "@" + usernames[0];
      channelName = usernames.join(", ");
    }
      return (
        <header id="main-team-header">
          <div id="main-header-content">
            {channelName}
            <br />
            <i id="channel-count-of-users" className="fa fa-user-o" aria-hidden="true"></i>
            <span id="channel-count-of-users">{this.props.channel.userCount}</span>
          </div>
        </header>
      );
  }

}

export default withRouter(MainHeader);
