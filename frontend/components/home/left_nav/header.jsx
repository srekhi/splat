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
      <section >
        <p>Splat</p>
        <p>Hi {this.username}</p>
        <button onClick={this.logoutUser}>Logout</button>
      </section>
    );
  }
}

export default Header;
