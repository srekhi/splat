import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ChatList from './chat_list';
import { fetchMessages, createMessage, removeMessage, editMessage, updateMessage} from '../../../../../frontend/actions/message_actions';
import { receiveMessage } from '../../../../../frontend/actions/message_actions';
import { deleteNotifications, createNotification } from '../../../../../frontend/actions/session_actions';


const mapStateToProps = (state, {match}) => {
  return {
    messages: Object.keys(state.messages).map(key => state.messages[key]),
    channel: state.channels.channels[match.params.channelId],
    currentUser: state.session.currentUser,
    notifications: state.session.notifications.filter( (notif) => {
      return notif.channel_id === parseInt(match.params.channelId);
    })
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: (channelId) => dispatch(fetchMessages(channelId)),
  createMessage: (msg) => dispatch(createMessage(msg)),
  receiveMessage: (msg) => dispatch(receiveMessage(msg)),
  removeMessage: (messageId) => dispatch(removeMessage(messageId)),
  editMessage: (message) => dispatch(editMessage(message)),
  updateMessage: (msg) => dispatch(updateMessage(msg)),
  createNotification: (channelId, userId) => dispatch(createNotification(channelId, userId)),
  deleteNotifications: (channelId) => dispatch(deleteNotifications(channelId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatList));
