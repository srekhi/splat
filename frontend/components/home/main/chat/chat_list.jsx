import React from 'react';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router';
import NewMessageForm from './new_message';
import DetailViewContainer from '../detail/detail_view_container';

class ChatList extends React.Component {
  constructor(props){
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.setSocket = this.setSocket.bind(this);
    this.addSocket = this.addSocket.bind(this);
    this.removeSocket = this.removeSocket.bind(this);
  }

  componentWillMount(){
    //subscription to be created here
    const channelId = this.props.match.params.channelId;
    this.props.fetchMessages(channelId);

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
    if (this.props.match.params.channelId != newProps.match.params.channelId) {
      // debugger;
      this.setSocket(newProps.match.params.channelId); ////changed this ;
      newProps.fetchMessages(newProps.match.params.channelId).then(this.scrollToBottom.bind(this));
      // setTimeout(this.scrollToBottom.bind(this), 50);
    }

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
    if (this.props.channel === undefined) return <p>Loading..</p>;
    const messages = this.props.messages.map((message) => {
      let messageContent =  <p id="message-text">{message.content}</p>;
      // let messageDate = message.created_at.split("T")[0];
      //here, i can do the logic for if message content begins with "giphy",
      //then render img src{message.content}, else render <p> msg. content</p>
      //
      if (message.content.startsWith("giphy")) {
        let messageGif = message.content.slice(6);
        let endOfImageUrl = message.content.indexOf("gif") + 3;
        let gifCaption = message.content.slice(endOfImageUrl);
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
      }
      return (<li className="chat-message">
        <div className="all-message-content">
          <img id="message-avatar" src={message.user.avatar_url} />
          <div className="message-content">
            <span id="message-author">{message.user.username}</span> <span id="message-time">{message.created_at}</span>
            <br />
            {messageContent}
          </div>
        </div>
      </li>);
    });
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
