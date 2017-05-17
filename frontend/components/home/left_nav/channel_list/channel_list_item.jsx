import React from 'react';
import { Link } from 'react-router-dom';
class ChannelListItem extends React.Component {
  constructor(props){
    super(props);
    this.channel = this.props.channel;
  }

  render(){
    return (
      <div>
        <Link className="channel-show-link" to={`/messages/${this.channel.id}`}>
          <h5 className="left-nav-channel-name">#{this.channel.name}</h5>
        </Link>
      </div>
    );
  }
}

export default ChannelListItem;
