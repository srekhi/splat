import { selectAllPublicChannels } from '../../../../reducers/selectors/channel_selectors';
import { selectAllUsers } from '../../../../reducers/selectors/user_selectors';

import { fetchChannels, createChannel, removeChannelErrors, deleteNotifications } from '../../../../actions/channel_actions';
import { fetchUsers } from '../../../../actions/user_actions';
import { fetchNotifications } from '../../../../actions/session_actions';


import { connect } from 'react-redux';
import ChannelList from './channel_list';

const mapStateToProps = (state) => ({
  publicChannels: selectAllPublicChannels(state),
  //this grabs the public channels from the state which is already unique for the user.
  user: state.session.currentUser,
  allUsers: selectAllUsers(state),
  errors: state.channels.errors,
  notifications: state.session.notifications
});

const mapDispatchToProps = (dispatch) => ({
  fetchChannels: (userId) => dispatch(fetchChannels(userId)),
  createChannel: (channel) => dispatch(createChannel(channel)),
  fetchUsers: () => dispatch(fetchUsers()),
  removeChannelErrors: () => dispatch(removeChannelErrors()),
  fetchNotifications: (userId) => dispatch(fetchNotifications(userId)),
  deleteNotifications: (channelId) => dispatch(deleteNotifications(channelId))

});


export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
