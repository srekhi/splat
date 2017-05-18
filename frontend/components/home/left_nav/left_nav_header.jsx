import React from 'react';
import { Redirect, hashHistory } from 'react-router';
import Modal from 'react-modal';
import LogoutBox from './logout_box';

class LeftNavHeader extends React.Component {
  constructor(props){
    super(props);
    this.username = this.props.user.username;
    this.user = this.props.user;
    this.logout = this.props.logout;
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.displayDropdown = this.displayDropdown.bind(this);
    this.modalStyle = {
      content : {
        top                   : '25%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '0%',
        transform             : 'translate(-50%, -50%)',
        width                 : '45%',
        height                : '25%'
      },
      overlay: {
        zIndex                : '1000'
      }
    };
    this.state = {
      className: "hidden"
    };
  }

  logoutUser(event) {
    document.removeEventListener("click", this.toggleDropdown);
    event.preventDefault();
    event.stopPropagation();
    this.props.logout();
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  toggleDropdown(){
      document.getElementById("logout-dropdown").classList.toggle("hidden");
      document.removeEventListener("click", this.toggleDropdown);
    }

  displayDropdown(e) {
    e.preventDefault();
    this.toggleDropdown();
    document.addEventListener("click", this.toggleDropdown);
  }


  render() {
    // <ul className={`${this.state.className}`}>
    //   <LogoutBox user={this.user}
    //     logoutUser={this.logoutUser}
    //     className={this.state.className}
    //     displayDropdown={this.displayDropdown}
    //     />
    // </ul>
    return (
      <section id="company-header">
        <h2 id="company-name"><b>Splat</b></h2>
        <i id="fa-bars-menu" className="fa fa-bars" aria-hidden="true" onClick={this.displayDropdown}>
          <ul id="logout-dropdown" className={`${this.state.className}`}>
            <li>
              <div className="logout-box">
                <div id="logout-box-user-display">
                  <img src={`${this.props.user.avatar_url}`} />
                  <div id="logout-box-user-details">
                    <p id="logout-box-username">{this.props.user.username}</p>
                    <p id="logout-box-handle">@{this.props.user.username}</p>
                  </div>
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
