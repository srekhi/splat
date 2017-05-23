import React from 'react';
import Modal from 'react-modal';
import NewChannelForm from '../channel_list/new_channel_form';
import ChannelListItem from '../channel_list/channel_list_item';
import Spinner from '../../../spinner';
class DMList extends React.Component {
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

  closeModal() {
    this.setState({ modalOpen: false });
    this.props.removeChannelErrors();
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  render(){
    if (this.props.privateChannels === undefined) return <Spinner />;
    const modal = <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}
        style={this.modalStyle}
        contentLabel="Channel">
          <div id="exit-new-channel" onClick={this.closeModal}>
            <i className="fa fa-times fa-3x" aria-hidden="true"></i>
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
            private="true"
            name="dm"
            />
      </Modal>;
    const channelItems = this.props.privateChannels.map((channel) => {
      return(
        <li key={channel.id}>
         <ChannelListItem channel={channel} private="true" channel={channel} currentUser={this.props.user}/>
        </li>
      );
    });
    //the {modal} is the plus sign that opens up to what we need.
    return (
      <nav>
        {modal}
        <ul id="left-nav-dm-list">
          <h2>DIRECT MESSAGES
            <i onClick={this.openModal} className="fa fa-plus-square" aria-hidden="true"></i>
          </h2>
          {channelItems}
        </ul>
      </nav>
    );
  }
}

export default DMList;
