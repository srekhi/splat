import React from 'react';
class NewMessageForm extends React.Component {
  constructor(props){
    super(props);
    this.createMessage = this.createMessage.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      channel_id: null,
      userId: null,
      content: ""
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState = {
      channel_id: newProps.channel.id,
      userId: newProps.userId,
      content: ""
    };
  }

  createMessage(){
    const msg = this.state;
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render(){
    if (this.props.channel === undefined) return <p></p>;
      return (
        <div className="new-message-input">
        <input
           id="message-content-input"
           onChange={this.update('content')}
           onClick={this.createMessage}
           type="text"
           placeholder={`Message #${this.props.channel.name}`}
            />
        </div>
    );

    }
}

export default NewMessageForm;
