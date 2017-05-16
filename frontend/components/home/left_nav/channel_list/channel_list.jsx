import React from 'react';
import ChannelListItem from './channel_list_item';
class ChannelList extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount() {
    this.props.fetchChannels(this.props.user.id);
  }
  componentWillReceiveProps(newProps) {
    this.publicChannels = newProps.publicChannels;
    this.channelCount = this.publicChannels.length;
  }
  render(){
    if (this.publicChannels === undefined) return <ul></ul>;

    const channelItems = this.publicChannels.map((channel) => {
      return(
        <li key={channel.id}>
         <ChannelListItem channel={channel}/>
        </li>
      );
    });
    return (
      <ul id="left-nav-channel-list">
        <i onClick={this.createChannel} class="fa fa-plus-square" aria-hidden="true"></i>
        <h2>CHANNELS <span>({this.channelCount})</span></h2>
        {channelItems}
      </ul>
    );
  }
}

export default ChannelList;
