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
      return (
        <header id="main-team-header">
          <div id="main-header-content">
            #{this.props.channel.name}
            <br />
            <i id="channel-count-of-users" className="fa fa-user-o" aria-hidden="true"></i>
            <span id="channel-count-of-users">{this.props.channel.userCount}</span>
          </div>
        </header>
      );
  }

}

export default withRouter(MainHeader);
