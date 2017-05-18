import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ChatList from './chat_list';
import { fetchMessages } from '../../../../../frontend/actions/message_actions';

const mapStateToProps = (state, {match}) => {
  return {
    messages: Object.values(state.messages),
    channel: state.channels.channels[match.params.channelId]
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: (channelId) => dispatch(fetchMessages(channelId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatList));
