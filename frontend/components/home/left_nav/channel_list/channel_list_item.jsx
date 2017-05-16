import React from 'react';
class ChannelListItem extends React.Component {
  constructor(props){
    super(props);
    this.channel = this.props.channel;
  }

  render(){
    return (
      <li>
        <h2>Test</h2>
        <h5>{this.channel.name}</h5>
      </li>
    );
  }
}

export default ChannelListItem;
