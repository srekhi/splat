import React from 'react';
import { Redirect, hashHistory } from 'react-router';
import Modal from 'react-modal';
class LeftNavHeader extends React.Component {
  constructor(props){
    super(props);
    this.username = this.props.user.username;
    this.user = this.props.user;
    this.logout = this.props.logout;
    this.logoutUser = this.logoutUser.bind(this);
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
      modalOpen: false,
      className: ""
    };
    this.displayDropdown = this.displayDropdown.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  logoutUser() {
    this.logout();
  }


  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
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
        <i id="fa-bars-menu" className="fa fa-bars" aria-hidden="true" onClick={this.openModal}>
          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            style={this.modalStyle}
            contentLabel="Logout">
            <div id="exit-logout-dropdown" onClick={this.closeModal}>
              <i className="fa fa-times fa-3x" aria-hidden="true"></i>
              <ul>
              <li>
                <div className="logout-box">
                  <div id="logout-box-user-display">
                    <img src={this.user.avatar_url} />
                    <p id="logout-box-username">{this.username}</p>
                    <p id="logout-box-handle">@{this.username}</p>
                  </div>
                  <span id="logout-box-logout-btn" onClick={this.logoutUser}>Logout</span>
                </div>
              </li>
            </ul>
            </div>
          </Modal>
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
