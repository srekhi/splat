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
        <li>
          <img src={user.avatar_url} />
          {user.username}
        </li>
      ));
      return (
        <section>
          <h2>{name}</h2>
          <h3>{userCount} members</h3>
          <ul>
            {userList}
          </ul>
        </section>
      );
    }
}
export default DetailView;
