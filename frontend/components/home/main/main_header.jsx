import React from 'react';

class MainHeader extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.fetchChannels(this.props.user.id);
  }

  render(){
    // return <h1>Test</h1>;
    if (this.props.channel === undefined) return <header>Loading..</header>;
      return (
        <header id="main-team-header">
          <div id="main-header-content">
            #{this.props.channel.name}
            <br />
            <i id="channel-count-of-users" className="fa fa-user-o" aria-hidden="true"></i>
            <span id="channel-count-of-users">{this.props.userCount}</span>
          </div>
        </header>
      );
  }

}

export default MainHeader;
