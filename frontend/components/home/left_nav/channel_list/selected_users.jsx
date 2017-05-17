import React from 'react';
class SelectedUsers extends React.Component {
  constructor(props) {
    super(props);

  }


  render(){
    const selectedUsers = this.props.selectedUsers.map((user) => {
      return (<li>
        {user.avatar_url}
        {user.username}
      </li>);
    });
    return (<ul className="selected-users">
      {selectedUsers}
    </ul>);
  }
}

export default SelectedUsers;
