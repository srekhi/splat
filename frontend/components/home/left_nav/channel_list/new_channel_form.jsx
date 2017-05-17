import React from 'react';
import AlertContainer from 'react-alert';
class NewChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      private: this.props.private,
      allUsers: this.props.allUsers
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createChannel = this.createChannel.bind(this);
    this.newChannelError = this.newChannelError.bind(this);
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

  clearState() {
    this.setState({username: "", password: ""});
  }

  createChannel() {
    let channel = this.state;
    this.props.createChannel(channel);
  }

  renderErrors() {
    if (this.props.errors.length > 0){
      this.props.errors.forEach((err)=> {
        return this.showAlert(err);
      });
    }
  }

  showAlert(err) {
    msg.show('Title missing', {
      time: 2000,
      type: 'success',
      icon: <img src="http://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,q_81,r_0,w_77/v1494891230/slack_zawidf.svg" width="32px" height="32px"/>
  });
}

  render() {
    if (this.props.allUsers === undefined) return <div></div>;
    let userList = this.props.allUsers.map((user) => {
      return(
        <li onClick={this.selectUser} className="new-channel-user-list-item">
          {user.username}
        </li>
    );
    });
    return (
      <div id="new-channel-window">
        <form className="channel-form" onSubmit={this.handleSubmit}>
          <h1> New Channel </h1>
            <input type="text"
              id="new-channel-title"
              value={this.state.title}
              onChange={this.update('title')}
              className="new-channel-input"
              placeholder="Channel Title"
            />
          <ul id="new-channel-form-list">
            {userList}
          </ul>
          <button onClick={this.createChannel} id="new-channel-button" type="submit" value="Submit">Go</button>
          <button onClick={this.showAlert} />
          {this.renderErrors()}
        </form>
        <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
      </div>
    );
  }
}
export default NewChannelForm;
