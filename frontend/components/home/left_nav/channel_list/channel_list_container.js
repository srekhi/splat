import { selectAllPublicChannels } from '../../../../reducers/selectors/channel_selectors';
import { fetchChannels, createChannel } from '../../../../actions/channel_actions';
import { connect } from 'react-redux';
import ChannelList from './channel_list';

const mapStateToProps = (state) => ({
  publicChannels: selectAllPublicChannels(state),
  //this grabs the public channels from the state which is already unique for the user.
  user: state.session.currentUser,
  errors: state.channels.errors
});

const mapDispatchToProps = (dispatch) => ({
  fetchChannels: (userId) => dispatch(fetchChannels(userId)),
  createChannel: (channel) => dispatch(createChannel(channel))
});


export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
