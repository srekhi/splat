import React from 'react';
import AlertContainer from 'react-alert';
import { createChannel } from '../../../../util/channel_api_util';
import { withRouter } from 'react-router-dom';
//actually creating a new membership.
class NewChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      private: this.props.private,
      allUsers: "",
      selectedUsers: [this.props.currentUser],
    };
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
    this.selectUser = this.selectUser.bind(this);
    this.deselectUser = this.deselectUser.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps(newProps){

    this.allUsers = newProps.allUsers;
    // this.allUsers[0]
    // Object {username: "demo-user"}
  }

  componentWillUnmount(){

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

  selectUser(user) {
    if (user.username !== this.props.currentUser.username && !(this.state.selectedUsers.includes(user))) {
      let currentSelectedUsers = this.state.selectedUsers;
      currentSelectedUsers.push(user);
      this.setState({selectedUsers: currentSelectedUsers});
    }
  }

  deselectUser(user) {
    event.preventDefault();
    let i = this.state.selectedUsers.indexOf(user);
    let newSelectedUsers = this.state.selectedUsers.slice(0, i).concat(this.state.selectedUsers.slice(i+1));
    this.setState({selectedUsers: newSelectedUsers});
  }

  createChannel() {
    event.preventDefault();
    if (!this.state.selectedUsers.includes(this.props.currentUser)){
      this.state.selectedUsers.push(this.props.currentUser);
    }
    let channel = this.state;
    channel['user_ids'] = this.state.selectedUsers.map(user => user.id);
    //channel variable created to be posted to rails s
    this.props.createChannel(channel).then( res => {
      if (res.channel !== undefined) {
        this.props.fetchChannels(this.props.currentUser.id);
        this.props.history.push(`/messages/${res.channel.id}`);
        this.props.closeModal();
        this.props.removeErrors();
      }
    });
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
      <section className="errors-new-channel">
        <ul className="error-list-new-channel">
          <li id="new-channel-error-fa">{error_exclamation}</li>
          {this.props.errors.map((error, i) => (
            <li id="new-channel-error" className="create-channel-error"  key={`error-${i}`}>
                {error}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  render() {
    let header;
    let renderChannelNameInput;
    let channelNameInput;
    header = (this.props.private === "true" ? "New Direct Message" : "New Channel");
    renderChannelNameInput = (this.props.private === "true" ? false : true);
    if (renderChannelNameInput) {
      channelNameInput = (
        <input type="text"
          id="new-channel-title"
          value={this.state.name}
          onChange={this.update('name')}
          className="new-channel-input"
          placeholder="Channel Name"
        />
      );
    }
    const self = this;
    let selectedUsers = this.state.selectedUsers.map((selectedUser) => {
      return (<li className="selected-user">
         <img src={ selectedUser.avatar_url } />
        {selectedUser.username}
        <i id="delete-selected-user" className="fa fa-times-circle-o" aria-hidden="true" onClick={() => self.deselectUser(selectedUser)} ></i>
      </li>);
    });

    let filteredUsers = this.props.allUsers.filter(
      (user) => {
        return user.username.indexOf(this.state.allUsers) !== -1;
      }
    );
    if (this.props.allUsers === undefined) return <div></div>;
    let userList = filteredUsers.map((user) => {
      return(
        <li onClick={() => this.selectUser(user)} className="new-channel-user-list-item">
          <img id="user-dropdown-logo" src={user.avatar_url} alt="avatar" />
          {user.username}
        </li>
    );
    });
    return (
      <div id="new-channel-window">
        <form className="channel-form">
          {this.renderErrors()}
          <h1>{header}</h1>

          <div id="wrap-username-and-button">
            <input type="text"
              id="new-channel-add-users-input"
              value={this.state.allUsers}
              onChange={this.update('allUsers')}
              className="new-channel-input"
              placeholder="Filter by user name"
            />
            <button onClick={this.createChannel} id="new-channel-button" type="submit" value="Submit">Go</button>
          </div>
          <section id="selected-users">
            <ul id="selected-user-list">
              { selectedUsers }
            </ul>
          </section>
          <ul id="new-channel-form-list" >
            {userList}
          </ul>
        </form>
      </div>
    );
  }
}
export default withRouter(NewChannelForm);
