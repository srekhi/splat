import React from 'react';

class LogoutBox extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return ( <li>
        <div className="logout-box">
          <div id="logout-box-user-display">
            <p id="logout-box-username">{this.props.username}</p>
            <p id="logout-box-handle">@{this.props.username}</p>
          </div>
          <span id="logout-box-logout-btn" onClick={this.props.logoutUser}>Logout</span>
        </div>
    </li>
    );
  }
}

export default LogoutBox;
