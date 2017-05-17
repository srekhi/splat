import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ChannelReducer from './channel_reducer';
import UserReducer from './user_reducer';
import MessageReducer from './message_reducer';
const RootReducer = combineReducers({
  session: SessionReducer,
  channels: ChannelReducer,
  users: UserReducer,
  messages: MessageReducer
});

export default RootReducer;
