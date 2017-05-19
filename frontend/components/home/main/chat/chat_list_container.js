import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ChatList from './chat_list';
import { fetchMessages, createMessage } from '../../../../../frontend/actions/message_actions';
import { receiveMessage } from '../../../../../frontend/actions/message_actions';


const mapStateToProps = (state, {match}) => {
  return {
    messages: Object.keys(state.messages).map(key => state.messages[key]),
    channel: state.channels.channels[match.params.channelId],
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: (channelId) => dispatch(fetchMessages(channelId)),
  createMessage: (msg) => dispatch(createMessage(msg)),
  receiveMessage: (msg) => dispatch(receiveMessage(msg))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatList));
