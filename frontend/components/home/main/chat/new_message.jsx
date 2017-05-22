import React from 'react';
import { withRouter } from 'react-router';
import GiphySearchContainer from '../giphys/giphys_search_container';
import MyEmojiInput from './emoticon/emoticon_picker';
import ReactEmoji from 'react-emoji';

class NewMessageForm extends React.Component {
  constructor(props){
    super(props);
    this.createMessage = this.createMessage.bind(this);
    this.state = {
      channel_id: this.props.channel.id,
      user_id: this.props.currentUser.id,
      content: '',
      giphyIsOpen: false,
      emoticonPickerOpen: false
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.formatUsers = this.formatUsers.bind(this);
    this.toggleGiphySearch = this.toggleGiphySearch.bind(this);
    this.clearState = this.clearState.bind(this);
    this.toggleEmojiDisplay = this.toggleEmojiDisplay.bind(this);
    this.addEmoticon = this.addEmoticon.bind(this);
    this.sendNotifications = this.sendNotifications.bind(this);

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
    this.sendNotifications();
    this.clearState();
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

  toggleGiphySearch(e) {
    e.preventDefault();
    this.setState({ giphyIsOpen: !this.state.giphyIsOpen });
  }

  sendNotifications(){
    // debugger;
    this.props.channel.users.forEach((user) => {
      if (user.id !== this.props.userId) {
        this.props.createNotification(this.props.channel.id, user.id);
      }
    });
  }

  clearState(){
    this.setState({content: "" });
  }

  addGiphy(giphy) {
    this.clearState();
    this.setState({ content: `giphy:${giphy}` });
  }

  toggleEmojiDisplay(){
    this.setState({ emoticonPickerOpen: !this.state.emoticonPickerOpen });
  }

  addEmoticon(emoticon){
    this.setState({content: this.state.content+ " "+ emoticon});
  }


  render(){
    let emojiDisplay = "";
    if (this.state.emoticonPickerOpen) {
      emojiDisplay = <MyEmojiInput
        addEmoticon={this.addEmoticon}
        toggleEmojiDisplay={this.toggleEmojiDisplay} />;
    }

    let giphyDisplay = "";
    let placeholder;
    if (this.state.giphyIsOpen) {
        giphyDisplay = (
          <GiphySearchContainer
            addGiphy={this.addGiphy.bind(this)}
            toggleGiphySearch={this.toggleGiphySearch.bind(this)}/>
        );
    }
    if (this.props.channel.private) {
      let usernames = this.formatUsers();
      placeholder = `Message ${usernames}`;
    } else{
      placeholder = `Message #${this.props.channel.name}`;
    }
    if (this.props.channel === undefined) return <p></p>;
      return (
        <div id="new-message-input">
          <div id="new-message-giphy" onClick={this.toggleGiphySearch}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </div>
          <input
             id="message-content-input"
             onChange={this.updateContent}
             type="text"
             value={this.state.content}
             onKeyPress={this.handleKeyPress}
             placeholder={placeholder} />
           <div id="emoji-toggle">
             { emojiDisplay }
             <i className="fa fa-smile-o" aria-hidden="true" onClick={this.toggleEmojiDisplay}></i>
           </div>

            {giphyDisplay}
        </div>
    );

    }
}

export default withRouter(NewMessageForm);
