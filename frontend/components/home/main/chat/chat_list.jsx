import React from 'react';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router';
import NewMessageForm from './new_message';
import DetailViewContainer from '../detail/detail_view_container';
import MyEmojiInput from './emoticon/emoticon_picker';
import ReactEmoji from 'react-emoji';
import MessageItem from './message_item';
import Spinner from '../../../spinner';

class ChatList extends React.Component {
  constructor(props){
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.setSocket = this.setSocket.bind(this);
    this.addSocket = this.addSocket.bind(this);
    this.removeSocket = this.removeSocket.bind(this);
    this.toggleEmojiDisplay = this.toggleEmojiDisplay.bind(this);
  }

  componentWillMount(){
    const channelId = this.props.match.params.channelId;
    this.props.fetchMessages(channelId);
    this.props.deleteNotifications(channelId);
    setTimeout(() => {
      const channel = this.props.channel;
      this.setSocket(channelId);
    }, 100);
  }


  componentDidMount(){
    // debugger;
    // setTimeout(this.scrollToBottom.bind(this), 500);
  }

  componentWillReceiveProps(newProps){
    if (this.props.match.params.channelId !== newProps.match.params.channelId){
      let oldChannelId = parseInt(this.props.match.params.channelId);
      this.props.deleteNotifications(oldChannelId);
    }
    if (this.props.match.params.channelId !== newProps.match.params.channelId) {
      if (newProps.notifications.length > 0){
        let newChannelId = newProps.match.params.channelId;
        newProps.deleteNotifications(newChannelId);
      }
      this.setSocket(newProps.match.params.channelId); ////changed this ;
      newProps.fetchMessages(newProps.match.params.channelId).then(this.scrollToBottom.bind(this));

      if (this.props.location.pathname.endsWith('details') && !newProps.location.pathname.endsWith('details')) {
        let newUrl = newProps.location.pathname;
        newProps.history.push(newUrl + '/details');
      }
    }


  }

  toggleEmojiDisplay(){
    this.setState({ emoticonPickerOpen: !this.state.emoticonPickerOpen });
  }

  scrollToBottom(){
    setTimeout( () => {
      let height = this.refs.chatMessages.scrollHeight;
      this.refs.chatMessages.scrollTop = height;
    }, 0);
  }

  setSocket(channelId) {
  if (window.App.channel) {
    this.removeSocket();
  }
    this.addSocket(channelId);
  }

  removeSocket(){
    window.App.cable.subscriptions.remove(window.App.channel);
  }


  addSocket(channelId) {
    window.App.channel = window.App.cable.subscriptions.create({
      channel: 'RoomChannel',
      channel_id: channelId
    }, {
      connected: () => {},
      disconnected: () => {},
      received: (data) => {
        this.props.receiveMessage(data.message);
      }
    });
  }

  render(){
    if (this.props.channel === undefined) return <p></p>;


    const messages = this.props.messages.map((message, idx) => {
      return <MessageItem
            key={message.id}
            message={message}
            removeMessage={this.props.removeMessage}
            currentUser={this.props.currentUser}
            editMessage={this.props.editMessage}
            updateMessage={this.props.updateMessage}
            channelId={this.props.match.params.channelId}
            deleteNotifications={this.props.deleteNotifications}
            />;
    }

  );
      return (
        <section className="all-messages-container">
          <div id="chat-list-and-detail-container">
            <ul ref="chatMessages" className="chat-message-list">
              { messages }
            </ul>
            <Route exact path="/messages/:channelId/details" component={DetailViewContainer} />
          </div>
          <footer id="new-message-footer">
            <NewMessageForm
              channel={this.props.channel}
              userId={this.props.currentUser.id}
              createMessage={this.props.createMessage}
              currentUser={this.props.currentUser}
              scrollToBottom={this.scrollToBottom}
              createNotification={this.props.createNotification}
              deleteNotifications={this.props.deleteNotifications}
              />
          </footer>
          {this.scrollToBottom()}
        </section>
      );
  }

}
//
// <section className="all-messages-container">
//   <ul className="chat-message-list">
//          <li className="chat-message">
      //   <div className="all-message-content">
      //     <img src={message.user.avatar_url} />
      //     <div className="message-content">
      //       {message.user.username} <span id="message-time">{message.created_at}</span>
      //       <br />
      //       {message.content}
      //     </div>
      //   </div>
      // </li>
//   </ul>
//   <footer id="new-message-footer">
//     <NewMessageForm channel={this.props.channel} />
//   </footer>
// </section>

export default withRouter(ChatList);
