import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ChatList from './chat_list';
import { fetchMessages } from '../../../../../frontend/actions/message_actions';

const mapStateToProps = (state) => ({
  messages: Object.values(state.messages),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: (channelId) => dispatch(fetchMessages(channelId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
