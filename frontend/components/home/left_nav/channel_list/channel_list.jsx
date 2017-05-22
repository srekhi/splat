import React from 'react';
import ChannelListItem from './channel_list_item';
import Modal from 'react-modal';
import NewChannelForm from './new_channel_form';
import DMListContainer from '../direct_messages/dm_list_container';
import FAClose from 'react-icons/lib/fa/close';
class ChannelList extends React.Component {
  constructor(props){
    super(props);
    this.state = { modalOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.modalStyle = {
      content : {
        top                   : '60%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '100%',
        height                : '140%'
      },
      overlay: {
        zIndex                : '1000'
      }
    };
  }
  componentWillMount() {
    this.props.fetchChannels(this.props.user.id);
    console.log('mounted');
    this.props.fetchNotifications(this.props.user.id);
  }

  componentWillReceiveProps(newProps) {
    this.publicChannels = newProps.publicChannels;
    this.channelCount = this.publicChannels.length;
    
  }
  closeModal() {
    this.setState({ modalOpen: false });
    this.props.removeChannelErrors();
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  render(){
    if (this.publicChannels === undefined || this.props.notifications === undefined) return <ul></ul>;
      // <div id="exit-new-channel" onClick={this.closeModal}>
      //   <i className="fa fa-times fa-3x" aria-hidden="true"></i>
      // </div>
    const modal = <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}
        style={this.modalStyle}
        contentLabel="Channel">
          <div id="exit-new-channel" onClick={this.closeModal}>
              <FAClose className="fa fa-times fa-3x" aria-hidden="true"/>
          </div>

          <NewChannelForm
            createChannel={this.props.createChannel}
            currentUser={this.props.user}
            errors={this.props.errors}
            allUsers={this.props.allUsers}
            fetchUsers={this.props.fetchUsers}
            closeModal={this.closeModal}
            removeErrors={this.props.removeChannelErrors}
            fetchChannels={this.props.fetchChannels}
            private="false"
            />
      </Modal>;
    const self = this;
    const channelItems = this.props.publicChannels.map((channel) => {
      let channelNotifications;
      channelNotifications = self.props.notifications.filter((notification) => (
        notification.channel_id === channel.id
      ));
      return(
        <li key={channel.id}>
         <ChannelListItem
           channel={channel}
           private="false"
           notifications={channelNotifications}
           />
        </li>
      );
    });
    return (
      <nav>
        {modal}
        <ul id="left-nav-channel-list">
          <h2>CHANNELS <span>({this.props.publicChannels.length})</span>
            <i onClick={this.openModal} className="fa fa-plus-square" aria-hidden="true"></i>
          </h2>
          {channelItems}
        </ul>
        <DMListContainer />
      </nav>
    );
  }
}

export default ChannelList;
