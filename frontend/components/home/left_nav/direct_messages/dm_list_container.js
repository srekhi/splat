import { selectAllPrivateChannels } from '../../../../reducers/selectors/channel_selectors';
import { selectAllUsers } from '../../../../reducers/selectors/user_selectors';
import { createChannel } from '../../../../actions/channel_actions';
import { connect } from 'react-redux';
import { fetchChannels, removeChannelErrors } from '../../../../actions/channel_actions';
import { fetchUsers } from '../../../../actions/user_actions';

import DMList from './dm_list';

const mapStateToProps = (state) => ({
  privateChannels: selectAllPrivateChannels(state),
  allUsers: selectAllUsers(state),
  errors: state.channels.errors,
  user: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  createChannel: (channel) => dispatch(createChannel(channel)),
  fetchChannels: (userId) => dispatch(fetchChannels(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
  removeChannelErrors: () => dispatch(removeChannelErrors())
});


export default connect(mapStateToProps, mapDispatchToProps)(DMList);
