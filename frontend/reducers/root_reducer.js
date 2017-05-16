import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ChannelReducer from './channel_reducer';
import UserReducer from './user_reducer';
const RootReducer = combineReducers({
  session: SessionReducer,
  channels: ChannelReducer,
  users: UserReducer
});

export default RootReducer;
