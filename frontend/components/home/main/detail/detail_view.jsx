import React from 'react';
class DetailView extends React.Component{
    constructor(props){
      super(props);
    }

    render(){
      if (this.props.channel === undefined) return <p>Loading..</p>;
      const name = "#" + this.props.channel.name;
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
            <h2>About {name}</h2>
              <i id="detail-view-exit" className="fa fa-times" aria-hidden="true"></i>
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
export default DetailView;
