import React from 'react';
import { withRouter } from 'react-router';
import Spinner from '../../../spinner';
class DetailView extends React.Component{
    constructor(props){
      super(props);
      this.closeDetailView = this.closeDetailView.bind(this);
    }

    closeDetailView(){
      console.log("is this being hit?");
      this.props.history.push(`/messages/${this.props.channelId}`);
    }

    render(){
      if (this.props.channel === undefined) return <p></p>;
      let name;
      name = "#" + this.props.channel.name;
      if (this.props.channel.private === true){
          name = "this conversation";
      }
      const userCount = this.props.channel.users.length;
      const users = this.props.channel.users;
      let userList = users.map((user) => (
        <li id="details-user-list-item">
          <img src={user.avatar_url} />
          <span id="detail-view-username">{user.username}</span>
        </li>
      ));


      return (
        <section id="detail-view">
          <div id="detail-view-header">
            <h2 id="about-team-header">About {name}</h2>
            <i onClick={this.closeDetailView} id="detail-view-exit" className="fa fa-times" aria-hidden="true"></i>
          </div>
          <div id="detail-user-info">
            <div id="detail-user-count-header">
              <h3> <i id="detail-fa" className="fa fa-user-o" aria-hidden="true"></i>
                {userCount} members
              </h3>
            </div>
            <ul id="detail-user-list">
              {userList}
            </ul>
          </div>
        </section>
      );
    }
}
export default withRouter(DetailView);
