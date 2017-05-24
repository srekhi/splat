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
    //subscription to be created here
    const channelId = this.props.match.params.channelId;
    this.props.fetchMessages(channelId);
    this.props.deleteNotifications(channelId);

    setTimeout(() => { //allows for state to be populated before running this.
      const channel = this.props.channel;
      this.setSocket(channelId); //changed this as well. because channel id === channelId. i think.
    }, 100);
    // this.scrollToBottom();
  }

  componentDidMount(){
    setTimeout(this.scrollToBottom.bind(this), 500);
  }

  componentWillReceiveProps(newProps){
    //subscription to be created here as well
    if (this.props.match.params.channelId !== newProps.match.params.channelId) {
      //delete notifications for the new channel
      let newChannelId = newProps.match.params.channelId;
      newProps.deleteNotifications(newChannelId);

      this.setSocket(newProps.match.params.channelId); ////changed this ;
      newProps.fetchMessages(newProps.match.params.channelId).then(this.scrollToBottom.bind(this));
      // setTimeout(this.scrollToBottom.bind(this), 50);

      //this:
      // if (this.props.location.pathname.endsWith('details') && !newProps.location.pathname.endsWith('details')) {
      //   let newUrl = newProps.location.pathname;
      //   newProps.history.push(newUrl + '/details');
      // }
    }


  }

  toggleEmojiDisplay(){
    this.setState({ emoticonPickerOpen: !this.state.emoticonPickerOpen });
  }

  scrollToBottom(){
    let height = this.refs.chatMessages.scrollHeight;
    this.refs.chatMessages.scrollTop = height;
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
    //add the channel as a property of the App on window.
    window.App.channel = window.App.cable.subscriptions.create({
      channel: 'RoomChannel',
      channel_id: channelId //set params for subscription in room_channel (passes to server side)
    }, {
      connected: () => {},
      disconnected: () => {},
      received: (data) => {
        this.props.receiveMessage(data.message);
      }
    });
  }

  render(){
    if (this.props.channel === undefined) return <Spinner />;


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
