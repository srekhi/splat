import React from 'react';
import { Redirect, hashHistory } from 'react-router';
class Header extends React.Component {
  constructor(props){
    super(props);
    this.username = this.props.username;
    this.logout = this.props.logout;
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    this.logout();
  }

  render() {
    return (
      <section id="company-header">
        <p id="company-name"><b>Splat</b></p>
        <div id="online-marker"></div>
        <p id="current-user-name">{this.username}</p>
        <i onClick={this.logoutUser} className="fa fa-bars" aria-hidden="true"></i>
      </section>
    );
  }
}

export default Header;
