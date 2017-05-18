import React from 'react';
class NewMessageForm extends React.Component {
  constructor(props){
    super(props);
    this.createMessage = this.createMessage.bind(this);
    this.state = {
      channelId: null,
      userId: null,
      content: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // this.setState = {
    //   channel_id: newProps.channel.id,
    //   userId: newProps.userId,
    //   content: ""
    // };
  }

  createMessage(){
    const msg = this.state;
    console.log('created');
    this.props.createMessage(msg);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({userId: this.props.userId, channelId: this.props.channel} );
      debugger;
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
           onKeyPress={this.handleKeyPress}
           placeholder={`Message #${this.props.channel.name}`}
            />
        </div>
    );

    }
}

export default NewMessageForm;
