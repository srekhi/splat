import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Picker } from 'emoji-mart';

class EmoticonPicker extends React.Component {
  constructor(props) {
    super(props);

    this.addEmoticon = this.addEmoticon.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() { //called when press face on message
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if(e.target.className != "emoji-picker") {
      this.props.closeEmoticonPicker();
    }
  }

  addEmoticon(event) {
    const emoticon = {
      user_id: this.props.userId,
      message_id: this.props.messageId,
      icon: event.id
    };

    this.props.addEmoticon(emoticon);
  }

  render() {
    if (this.props.emoticonPicker
        && this.props.messageId === this.props.pickerMsgId) {
      return (
        <div className='emojiPickerContainer'>
          <Picker onClick={ this.addEmoticon }/>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}
