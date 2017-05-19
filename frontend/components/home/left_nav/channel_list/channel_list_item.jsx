import React from 'react';
import { Link } from 'react-router-dom';
class ChannelListItem extends React.Component {
  constructor(props){
    super(props);
    this.channel = this.props.channel;
  }

  render(){
    let channelName = "#" + this.channel.name;
    let dmPersonCount = "";
    if (this.props.private === "true") {
        let usernames = this.channel.users.map((user) => {
          return user.username;
        });
        usernames[0] = "@" + usernames[0];
        if (usernames.join(" ").length > 30) {
          dmPersonCount = usernames.length;
          usernames = usernames.slice(0, usernames.length).join(", ") + "...";
          channelName = usernames;
        }else{
          channelName = usernames.join(", ");
        }
    }
    return (
      <div id="channel-list-item">
        <Link className="channel-show-link" to={`/messages/${this.channel.id}`}>
          <h5 className="left-nav-channel-name">{channelName}</h5>

        </Link>
      </div>
    );
  }
}

export default ChannelListItem;
