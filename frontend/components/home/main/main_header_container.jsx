import { withRouter } from 'react-router';
import MainHeader from './main_header';
import { selectChannelById } from '../../../reducers/selectors/channel_selectors';
import { connect } from 'react-redux';
import { fetchChannels, fetchUserCount } from '../../../actions/channel_actions';

const mapStateToProps = (state, { match }) => {
  let channelId = match.params.channelId;
  return {
    user: state.session.currentUser,
    channel: state.channels.channels[channelId],
    messages: state.messages,
  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannels: (userId) => dispatch(fetchChannels(userId)),
    fetchUserCount: (id) => dispatch(fetchUserCount(id))
  };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainHeader));
