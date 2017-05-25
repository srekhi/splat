import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ChannelReducer from './channel_reducer';
import UserReducer from './user_reducer';
import MessageReducer from './message_reducer';
import GiphysReducer from './giphy_reducer';


const AppReducer = combineReducers({
  session: SessionReducer,
  channels: ChannelReducer,
  users: UserReducer,
  messages: MessageReducer,
  giphys: GiphysReducer
});

const RootReducer = (state, action) => {
  if (action.type === "RECEIVE_CURRENT_USER" && action.currentUser === null){
    state = undefined;
  }
  return AppReducer(state, action);
};

export default RootReducer;
