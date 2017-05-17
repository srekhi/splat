import React from 'react';
import ChannelListItem from './channel_list_item';
import Modal from 'react-modal';
import NewChannelForm from './new_channel_form';
class ChannelList extends React.Component {
  constructor(props){
    super(props);
    this.state = { modalOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modalStyle = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '100%',
        height                : '100%'
      },
      overlay: {
        zIndex                : '1000'
      }
    };
  }
  componentWillMount() {
    this.props.fetchChannels(this.props.user.id);
  }
  componentWillReceiveProps(newProps) {
    this.publicChannels = newProps.publicChannels;
    this.channelCount = this.publicChannels.length;
  }
  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  render(){
    if (this.publicChannels === undefined) return <ul></ul>;
    const modal = <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}
        style={this.modalStyle}
        contentLabel="Channel">
          <div id="exit-new-channel">
            <i className="fa fa-times fa-3x" aria-hidden="true"></i>
          </div>
          <NewChannelForm createChannel={this.props.createChannel}
            errors={this.props.errors}
            allUsers={this.props.allUsers}
            fetchUsers={this.props.fetchUsers}
            />
      </Modal>;
    const channelItems = this.publicChannels.map((channel) => {
      return(
        <li key={channel.id}>
         <ChannelListItem channel={channel} private="false"/>
        </li>
      );
    });
    return (
      <nav>
        {modal}
        <ul id="left-nav-channel-list">
          <h2>CHANNELS <span>({this.channelCount})</span>
            <i onClick={this.openModal} className="fa fa-plus-square" aria-hidden="true"></i>
          </h2>
          {channelItems}
        </ul>
      </nav>
    );
  }
}

export default ChannelList;
