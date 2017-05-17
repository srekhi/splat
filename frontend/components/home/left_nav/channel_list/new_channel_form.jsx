import React from 'react';
import AlertContainer from 'react-alert';
import { createChannel } from '../../../../util/channel_api_util';
import { hashHistory } from 'react-router';
class NewChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      private: this.props.private,
      allUsers: "",
      selectedUsers: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createChannel = this.createChannel.bind(this);
    this.newChannelError = this.newChannelError.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.addUser = this.addUser.bind(this);
    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps(newProps){

    this.allUsers = newProps.allUsers;
    // this.allUsers[0]
    // Object {username: "demo-user"}
  }

  addUser(e) {
    
  }

  newChannelError(err){
    // this.props.errors should have the updated errors.
    this.msg.show(err, {
      time: 2000,
      type: 'success',
      icon: <img src="https://res.cloudinary.com/dwqeotsx5/image/upload/v1490042404/Slack-icon_rkfwqj.png" width="32px" height="32px"/>
    });

  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit() {
    event.preventDefault();

  }

  createChannel() {
    let channel = this.state;
    this.props.createChannel(channel);
    // createChannel(this.state).then(savedChannel => {
    //   hashHistory.push(`/api/channels/${savedChannel.id}`);
    // });

  }

  // renderErrors() {
  //   if (this.props.errors.length > 0){
  //     this.props.errors.forEach((err)=> {
  //       // return this.showAlert(err);
  //
  //     });
  //   }
  // }

  renderErrors() {
    let error_exclamation = "";
    if (this.props.errors.length > 0){
      error_exclamation = <i className="fa fa-exclamation" aria-hidden="true"></i>;
    }
    return(
      <section className="errors">
        <ul className="error-list">
          <li>{error_exclamation}</li>
          {this.props.errors.map((error, i) => (
            <li className="create-channel-error"  key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      </section>
    );
  }


  showAlert(err) {
    msg.show('Title missing', {
      time: 2000,
      type: 'success',
      icon: <img src="http://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,q_81,r_0,w_77/v1494891230/slack_zawidf.svg" width="32px" height="32px"/>
  });
}

  render() {

    let selectedUsers = this.state.selectedUsers.map((selectedUser) =>{
      <li>{selectedUser.username}</li>
    });
    let filteredUsers = this.props.allUsers.filter(
      (user) => {
        return user.username.indexOf(this.state.allUsers) !== -1;
      }
    );
    if (this.props.allUsers === undefined) return <div></div>;
    let userList = filteredUsers.map((user) => {
      return(
        <li onClick={this.selectUser} className="new-channel-user-list-item">
          <img id="user-dropdown-logo" src={user.avatar_url} alt="avatar" />
          {user.username}
        </li>
    );
    });
    return (
      <div id="new-channel-window">
        <form className="channel-form" onSubmit={this.handleSubmit}>
          <h1>New Channel</h1>
            <input type="text"
              id="new-channel-title"
              value={this.state.name}
              onChange={this.update('name')}
              className="new-channel-input"
              placeholder="Channel Name"
            />
          <div id="wrap-username-and-button">
            <input type="text"
              id="new-channel-add-users-input"
              value={this.state.allUsers}
              onChange={this.update('allUsers')}
              className="new-channel-input"
              placeholder="Add Users"
            />
            <button onClick={this.createChannel} id="new-channel-button" type="submit" value="Submit">Go</button>
          </div>
          <ul class="selected-users" onClick={this.addUser}>
            { selectedUsers }
          </ul>
          <ul id="new-channel-form-list">
            {userList}
          </ul>
          {this.renderErrors()}
        </form>
        <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
      </div>
    );
  }
}
export default NewChannelForm;
