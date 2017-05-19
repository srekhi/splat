import React from 'react';
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
    console.log('created');
    this.clearState();
    this.props.createMessage(msg);
    $("#chat-message-list").scrollTop = $("#chat-message-list").scrollHeight;
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

  render(){
    if (this.props.channel === undefined) return <p></p>;
      return (
        <div className="new-message-input">
        <input
           id="message-content-input"
           onChange={this.updateContent}
           type="text"
           value={this.state.content}
           onKeyPress={this.handleKeyPress}
           placeholder={`Message #${this.props.channel.name}`}
            />
        </div>
    );

    }
}

export default NewMessageForm;
