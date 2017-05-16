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
  }
  render(){
    if (this.publicChannels === undefined) return <ul></ul>;

    const channelItems = this.publicChannels.map((channel) => {
      return <ChannelListItem channel={channel}/>;
    });
    return (
      <ul className="channel-list">
        {channelItems}
      </ul>
    );
  }
}

export default ChannelList;
