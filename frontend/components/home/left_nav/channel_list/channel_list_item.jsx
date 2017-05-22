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
    let usernames = [];
    let notificationDisplay = "";
    if (this.props.notifications.length > 0){
      notificationDisplay = <div id="notification-count">{this.props.notifications.length}</div>;
    }
    if (this.props.private === "true") {
        // let usernames = this.channel.users.map((user) => {
        //   // if (user.username != this.props.currentUser.username) {
        //     // return user.username;
        //   // }
        //   if (user.username === this.props.currentUser.username && this.channel.users.length !== 1) {
        //     return "";
        //   }
        //   return user.username;
        // });
        for (var i = 0; i < this.channel.users.length; i++) {
          let user = this.channel.users[i];
          if (user.username === this.props.currentUser.username && this.channel.users.length !== 1) {
            continue;
          }
          usernames.push(user.username);
        }

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
          {notificationDisplay}
        </Link>
      </div>
    );
  }
}

export default ChannelListItem;
