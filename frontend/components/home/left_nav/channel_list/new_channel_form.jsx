import React from 'react';

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
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps(newProps){
    this.allUsers = newProps.allUsers;
    // this.allUsers[0]
    // Object {username: "demo-user"}
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
    let error_exclamation = "";
    if (this.props.errors.length > 0){
      error_exclamation = <i className="fa fa-exclamation" aria-hidden="true"></i>;
    }
    return(
      <section className="errors">
        <ul className="error-list">
          <li>{error_exclamation}</li>
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  render() {
    if (this.props.allUsers === undefined) return <div></div>;
    let userList = this.props.allUsers.map((user) => {
      return(
        <li className="new-channel-user-list-item">
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
          {this.renderErrors()}
        </form>
      </div>
    );
  }
}
export default NewChannelForm;
