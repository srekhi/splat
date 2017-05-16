import React from 'react';
class ChannelListItem extends React.Component {
  constructor(props){
    super(props);
    this.channel = this.props.channel;
  }

  render(){
    return (
      <div >
        <h5 className="left-nav-channel-name"># {this.channel.name}</h5>
      </div>
    );
  }
}

export default ChannelListItem;
