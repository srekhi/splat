import React from 'react';
import EmojiPicker from 'react-emoji-picker';
import emojiMap from 'react-emoji-picker/lib/emojiMap';

// styles for the emoji picker wrapper
class MyEmojiInput extends React.Component {
  constructor(){
    super();
    var emojiPickerStyles = {
      position: 'absolute',
      left: 0, top: '3.9rem',
      backgroundColor: 'white',
      width: '100%',
      padding: '.3em .6em',
      border: '1px solid #0074d9',
      borderTop: 'none',
      zIndex: '2'
    };
    this.state = {
        emoji: null,
        showEmojiPicker: false,
      };

    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.updateState = this.updateState.bind(this);
    this.setEmoji = this.setEmoji.bind(this);
    this.validateEmoji = this.validateEmoji.bind(this);
    this.grabKeyPress = this.grabKeyPress.bind(this);
    this.emojiPicker = this.emojiPicker.bind(this);
    }
  componentDidMount() {
    document.addEventListener('click', this.toggleEmojiPicker, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleEmojiPicker, false);
  }

  toggleEmojiPicker(e) {
    if(this.refs.emoji.contains(e.target)) {
      this.setState({showEmojiPicker: true});
    } else {
      setTimeout(this.validateEmoji, 10);
      this.setState({showEmojiPicker: false});
    }
  }

  validateEmoji() { //filters based on emoji text
    var matched = emojiMap.filter(function(emoji) {
      return `:${emoji.name}:` === this.state.emoji;
    });

    if(matched.length === 0) {
      this.setState({emoji: null});
    }
  }

  updateState (e) {
    this.setState({emoji: e.target.value});
  }

  setEmoji(emoji) {
    this.setState({emoji: emoji});
    // debugger;
    this.props.addEmoticon(emoji);
    // $("#message-content-input").val(emoji);
    //here I need to do the logic of populating text input with that value.
  }

  // allows selecting first emoji by pressing "Enter" without submitting form
  grabKeyPress(e) {
    if(e.keyCode === 13) {
      e.preventDefault();
    }
  }

  emojiPicker() {
    if(this.state.showEmojiPicker) {
      return (
        <EmojiPicker
          style={this.emojiPickerStyles} onSelect={this.setEmoji}
          query={this.state.emoji}
        />
    );
    }
  }

  render() {
    return (
      <form ref="emoji" className="emoji-form">
        <label htmlFor="emoji">Emoji</label>
        <input name="emoji" id="emoji" value={this.state.emoji} autoComplete="off"
          type={this.state.showEmojiPicker ? "search" : "text"}
          onChange={this.updateState} onKeyDown={this.grabKeyPress}/>
        {this.emojiPicker()}
      </form>
    );
  }
}

export default MyEmojiInput;
