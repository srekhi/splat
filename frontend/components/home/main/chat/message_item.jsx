import React from 'react';
import MyEmojiInput from './emoticon/emoticon_picker';
import ReactEmoji from 'react-emoji';
import AlertContainer from 'react-alert';
import { addEmojiToMessage } from '../../../../util/emoticon_api_util';

class MessageItem extends React.Component{
  constructor(props){
    super(props);
    this.message = this.props.message;
    this.deleteMessage = this.deleteMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.createEditForm = this.createEditForm.bind(this);
    this.toggleEmojiDisplay = this.toggleEmojiDisplay.bind(this);
    this.addEmoticon = this.addEmoticon.bind(this);
    this.state = {
      id: this.message.id,
      user_id: this.message.user_id,
      channel_id: this.message.channel_id,
      showEditForm: false,
      content: this.message.content,
      emoticonPickerOpen: false,
      icon: "",
      message_id: this.message.id
    };
  }

  toggleEmojiDisplay(){
    this.setState({ emoticonPickerOpen: !this.state.emoticonPickerOpen });
  }

  addEmoticon(emoticon){
    this.setState({
      content: this.state.content+ " "+ emoticon,
      icon: emoticon
    });

    let newState = this.state;
    newState['icon'] = emoticon;

    addEmojiToMessage(newState);
    // here i need to add the emoji to the list of message reactions
    //fire off an ajax request to save the emoji string.
    //on the frontend i can iterate through the reactions and call React.Emojify.

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
      this.props.removeMessage(this.message.id);
    }
  }

  // showAuthorAlert(){
  //   msg.show('You are not the author of this message', {
  //     time: 2000,
  //     type: 'info',
  //   });
  // }
  //
  // buildAlert() {
  //   const alertOptions = {
  //     offset: 25,
  //     position: 'bottom left',
  //     theme: 'dark',
  //     time: 2000,
  //     transition: 'scale'
  //   };
  //   return(
  //     <div>
  //       <AlertContainer ref={(a) => global.msg = a} {...alertOptions} />
  //     </div>
  //   );
  // }


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
    let emojiDisplay = "";
    let reactions;

    //handle logic here for multiple of the same thing.
    reactions = this.props.message.emoticons.map(emoticon =>{
      return ReactEmoji.emojify(emoticon.icon);
    });
    if (this.state.emoticonPickerOpen) {
      emojiDisplay = <MyEmojiInput
        addEmoticon={this.addEmoticon}
        toggleEmojiDisplay={this.toggleEmojiDisplay}
        />;
    }


    let messageContent =  <p id="message-text">{ReactEmoji.emojify(this.props.message.content)}</p>;
    //this logic exists to set variables for rendering further down.
    if (this.props.message.content.startsWith("giphy")) {
      let messageGif = this.props.message.content.slice(6);
      let endOfImageUrl = this.props.message.content.indexOf("gif") + 3;
      let gifCaption = this.props.message.content.slice(endOfImageUrl);
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
          {reactions}
        </div>
        <div className="message-buttons hidden">

          <div id="message-button" onClick={this.toggleEmojiDisplay}>
            <i className="fa fa-smile-o fa-6" aria-hidden="true"></i>
          </div>

          {emojiDisplay}

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