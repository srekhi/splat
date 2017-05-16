import React from 'react';
import { Redirect, hashHistory } from 'react-router';
class LeftNavHeader extends React.Component {
  constructor(props){
    super(props);
    this.username = this.props.username;
    this.logout = this.props.logout;
    this.logoutUser = this.logoutUser.bind(this);
    this.state = {className: "hidden"} ;
    this.displayDropdown = this.displayDropdown.bind(this);
  }

  logoutUser() {
    this.logout();
  }

  displayDropdown() {
    if (this.state.className === "hidden")
      this.setState({className: ""});
    else {
      this.setState({className: "hidden"});
    }
  }

  render() {
    return (
      <section id="company-header">
        <h2 id="company-name"><b>Splat</b></h2>
        <i id="fa-bars-menu" className="fa fa-bars" aria-hidden="true" onClick={this.displayDropdown}>
          <ul className={`${this.state.className}`}>
            <li>
            <div className="logout-box">
              <div id="logout-box-user-display">
                <p id="logout-box-username">{this.username}</p>
                <p id="logout-box-handle">@{this.username}</p>
              </div>
              <span id="logout-box-logout-btn" onClick={this.logoutUser}>Logout</span>
            </div>
          </li>
          </ul>
        </i>
        <div id ="left-nav-username-display">
          <div id="online-marker"></div>
          <p id="current-user-name">{this.username}</p>
        </div>
      </section>
    );
  }
}

export default LeftNavHeader;
