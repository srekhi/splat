import React from 'react';
import { withRouter } from 'react-router-dom';

class ChatList extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const channelId = this.props.match.params.channelId;
    this.props.fetchMessages(channelId);
  }

  render(){
    const messages = this.props.messages.map((message) => (
      <li className="chat-message">
        {message.content}
      </li>
    ));
      return (
          <ul className="chat-message-list">
            yo
            { messages }
          </ul>
      );
  }

}

export default withRouter(ChatList);
