import React from 'react';
import MyEmojiInput from './emoticon/emoticon_picker';
import ReactEmoji from 'react-emoji';
import AlertContainer from 'react-alert';


class MessageItem extends React.Component{
  constructor(props){
    super(props);
    this.message = this.props.message;
    this.deleteMessage = this.deleteMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.createEditForm = this.createEditForm.bind(this);

    this.state = {
      id: this.message.id,
      user_id: this.message.user_id,
      channel_id: this.message.channel_id,
      showEditForm: false,
      content: this.message.content
    };

  }


  updateContent(e) {
      let content = e.currentTarget.value;
      this.setState( {content} );
    }


  createEditForm(){
    return (
      <form onSubmit={ this.editMessage }>
        <input
           id="message-content-input"
           onChange={this.updateContent}
           type="text"
           value={this.state.content}
           onKeyPress={this.handleKeyPress}
           />
      </form>
    );
  }


  updateContent(e) {
    let content = e.currentTarget.value;
    this.setState( {content} );
  }

  handleInput(e){
    e.preventDefault();
    this.setState({content: e.target.value});
  }

  deleteMessage(e){
    e.preventDefault();
    if (this.props.currentUser.id !== this.message.user_id) {
      console.log("you aren't the author of this message-cant delete");
    } else{
      // this.props.removeMessage(this.message.id);
    }
  }

  toggleEditForm(){
    this.setState({showEditForm: !this.state.showEditForm});
  }

  editMessage(e){
    e.preventDefault();
    if (this.props.currentUser.id !== this.message.user_id) {
      console.log("you aren't the author of this message-cant edit");
    } else{
      this.toggleEditForm();
      this.props.editMessage(this.state);
    }
  }
  render(){
    let messageContent =  <p id="message-text">{ReactEmoji.emojify(this.message.content)}</p>;

    //this logic exists to set variables for rendering further down.
    if (this.message.content.startsWith("giphy")) {
      let messageGif = this.message.content.slice(6);
      let endOfImageUrl = this.message.content.indexOf("gif") + 3;
      let gifCaption = this.message.content.slice(endOfImageUrl);
      messageContent = (
        <div>
          <p id="message-text">{gifCaption}</p>
            <div id="gif-container">
              <div id="left-gif-bar"></div>
              <img
                id="gif-message"
                src={messageGif} />
            </div>
        </div>
    );
  } else if (this.state.showEditForm) {
    messageContent = this.createEditForm();
  }
    return (<li className="chat-message">
      <div className="all-message-content">
        <img id="message-avatar" src={this.message.user.avatar_url} />
        <div className="message-content">
          <span id="message-author">{this.message.user.username}</span> <span id="message-time">{this.message.created_at}</span>
          <br />
          {messageContent}
        </div>
        <div className="message-buttons hidden">

          <div id="message-button">
            <i className="fa fa-smile-o fa-6" aria-hidden="true"></i>
          </div>

          <div id="message-button" onClick={this.editMessage}>
            <i className="fa fa-pencil-square-o fa-6" aria-hidden="true"></i>
          </div>

          <div id="message-button" onClick={this.deleteMessage}>
            <i className="fa fa-times-circle-o fa-6" aria-hidden="true"></i>
          </div>

        </div>
      </div>
    </li>);
  }
}

export default MessageItem;
