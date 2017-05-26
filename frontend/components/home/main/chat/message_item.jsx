import React from 'react';
import MyEmojiInput from './emoticon/emoticon_picker';
import ReactEmoji from 'react-emoji';
import AlertContainer from 'react-alert';
import { addEmojiToMessage } from '../../../../util/emoticon_api_util';


//TODO: set state on visibility for class.

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
    this.compressEmoticons = this.compressEmoticons.bind(this);

    this.state = {
      id: this.message.id,
      user_id: this.message.user_id,
      channel_id: this.message.channel_id,
      showEditForm: false,
      content: this.message.content,
      emoticonPickerOpen: false,
      icon: "",
      message_id: this.message.id,
      emojiButtonClass: "message-buttons invisible"
    };
    this.alertOptions = {
      offset: 25,
      position: 'bottom left',
      theme: 'dark',
      time: 0,
      transition: 'scale'
    };
  }

  toggleEmojiDisplay(e){
    // e.preventDefault();

    // e.target.parentElement.parentElement.classList.toggle("invisible");
    //both of these
    if (this.state.emojiButtonClass.indexOf("invisible") > -1){
      this.setState({emojiButtonClass: "message-buttons"});
      // debugger;
    }else{
      this.setState({emojiButtonClass: "message-buttons invisible"});
    }
    this.setState({ emoticonPickerOpen: !this.state.emoticonPickerOpen });
  }

  addEmoticon(emoticon){
    this.setState({
      content: this.state.content+ " "+ emoticon,
      icon: emoticon,
    });

    let newState = this.state;
    newState['user_id'] = this.props.currentUser.id;
    newState['message_id'] = this.props.message.id;
    newState['icon'] = emoticon;
    //need to add emojis
    addEmojiToMessage(newState).then(responseEmoticon => {
      let message = responseEmoticon.message;
      return this.props.updateMessage(message);
    });
    // here i need to add the emoji to the list of message reactions
    //fire off an ajax request to save the emoji string.
    //on the frontend i can iterate through the reactions and call React.Emojify.

  }

  updateContent(e) {
      let content = e.currentTarget.value;
      this.setState( {content} );
    }


  createEditForm(){
    // this.setState({content: this.props.message.content});
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
      this.showAlert("You are not the author of this message");
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

  componentDidUpdate(){
    if ($(".emoji-form span").first().offset() && $(".emoji-form span").first().offset().top < 40){
      // debugger;
      let oldTop = $(".emoji-form span").first().offset().top;
      let oldLeft = $(".emoji-form span").first().offset().left;
      $(".emoji-form span").first().offset({top: oldTop + 300, left: oldLeft - 60 });
    }
  }


  toggleEditForm(){
    this.setState({showEditForm: !this.state.showEditForm});

  }

  editMessage(e){
    e.preventDefault();
    if (this.props.currentUser.id !== this.message.user_id) {
      this.showAlert("You are not the author of this message");
      //insert a react alert here.
    } else{
      this.toggleEditForm();
      this.props.editMessage(this.state);
    }
  }

  compressEmoticons(emoticons){
    if (emoticons.length === 0) { return {}; }
    let counts = {};
    emoticons.forEach((emoticon) => {
      let icon = emoticon.icon;
      counts[icon] = (counts[icon] || 0) +1;
    });

    return counts;
  }

  showAlert(text){
    msg.show(text, {
      time: 2000,
      type: 'info',
      icon: <img src="https://res.cloudinary.com/dbbzpmyvc/image/upload/c_thumb,h_40,w_40/v1494891230/slack_zawidf.png"
      />
    });
  }

  render(){
    let emojiDisplay = "";
    let reactions;
    reactions = this.compressEmoticons(this.props.message.emoticons);
    if (this.props.message.emoticons.length > 0){
      // debugger;
    }
    //reactions keys are each different emojis with their values = count of occurrences

    //handle logic here for multiple of the same thing.
    //need a way to compress the array into duplicates with the number of their dups.
    reactions = Object.keys(reactions).map((icon => {
      return (
        <div id="reaction" onClick={() => this.addEmoticon(icon)}>
          {ReactEmoji.emojify(icon)}
          {reactions[icon]}
      </div>);
    }));
    if (this.state.emoticonPickerOpen) {
      emojiDisplay = <MyEmojiInput
        className="emoji-picker-display"
        addEmoticon={this.addEmoticon}
        toggleEmojiDisplay={this.toggleEmojiDisplay}
        />;
    }


    let messageContent =  <p id="message-text">{ReactEmoji.emojify(this.props.message.content)}</p>;
    //this logic exists to set variables for rendering further down.
    if (this.props.message.content.startsWith("giphy")) {
      let endOfImageUrl = this.props.message.content.indexOf("gif") + 3;
      let messageGif = this.props.message.content.slice(6, endOfImageUrl);
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
    return (<li key={this.props.message.id}
      className="chat-message">
      <div className="all-message-content">
        <img id="message-avatar" src={this.message.user.avatar_url} />
        <div className="message-content">
          <span id="message-author">{this.message.user.username}</span> <span id="message-time">{this.message.created_at}</span>
          <br />
          {messageContent}
          <div id="reaction-list">
            {reactions}
          </div>
        </div>
        <AlertContainer id="alert-container" ref={a => global.msg = a} {...this.alertOptions} />
        {emojiDisplay}

        <div className={this.state.emojiButtonClass}>

          <div id="message-button" onClick={this.toggleEmojiDisplay}>
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
