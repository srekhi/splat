import React from 'react';
import EnhanceWithClickOutside from 'react-click-outside';

class LogoutBox extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      isOpened: false,
      className: ""
    };
  }

  handleClickOutside() {
    this.props.displayDropdown();
  }


  render(){
    return (
      <ul className={`${this.state.className}`}>
        <li>
          <div id="logout-box" className="logout-box">
            <div id="logout-box-user-display">
              <img src={`${this.props.user.avatar_url}`} />
              <div id="logout-box-user-details">
                <p id="logout-box-username">{this.props.user.username}</p>
                <p id="logout-box-handle">@{this.props.user.username}</p>
              </div>
            </div>
            <span id="logout-box-logout-btn" onClick={this.props.logoutUser}>Logout</span>
          </div>
        </li>
      </ul>
    );
  }
}

export default EnhanceWithClickOutside(LogoutBox);
