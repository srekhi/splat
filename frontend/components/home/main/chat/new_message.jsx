import React from 'react';
import { withRouter } from 'react-router';

class NewMessageForm extends React.Component {
  constructor(props){
    super(props);
    this.createMessage = this.createMessage.bind(this);
    this.state = {
      channel_id: this.props.channel.id,
      user_id: this.props.currentUser.id,
      content: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.clearState = this.clearState.bind(this);
    this.formatUsers = this.formatUsers.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // this.setState = {
    //   channel_id: newProps.channel.id,
    //   userId: newProps.userId,
    //   content: ""
    // };
  }

  clearState() {
    this.setState({content: ""});
  }



  createMessage(){
    const msg = this.state;
    this.state.channel_id = this.props.match.params.channelId;
    this.props.createMessage(msg).then(this.props.scrollToBottom);
    console.log('created');
    this.clearState();
    // this.props.scrollToBottom();
    // window.scrollTo( 0, 500 );
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({user_id: this.props.userId, channel_id: this.props.channel.id} );
      this.createMessage();
    }
  }

  updateContent(e) {
    let content = e.currentTarget.value;
    this.setState( {content} );
  }

  formatUsers(){
    let usernames = [];
      for (var i = 0; i < this.props.channel.users.length; i++) {
        let user = this.props.channel.users[i];
        if (user.username === this.props.currentUser.username && this.props.channel.users.length !== 1) {
          continue;
        }
        usernames.push(user.username);
      }
      usernames[0] = "@" + usernames[0];
      return usernames;
  }

  render(){
    let placeholder;
    if (this.props.channel.private) {
      let usernames = this.formatUsers();
      placeholder = `Message ${usernames}`;
    } else{
      placeholder = `Message #${this.props.channel.name}`;
    }
    if (this.props.channel === undefined) return <p></p>;
      return (
        <div className="new-message-input">
        <input
           id="message-content-input"
           onChange={this.updateContent}
           type="text"
           value={this.state.content}
           onKeyPress={this.handleKeyPress}
           placeholder={placeholder}
            />
        </div>
    );

    }
}

export default withRouter(NewMessageForm);
