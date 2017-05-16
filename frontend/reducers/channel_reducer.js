import merge from 'lodash/merge';

import {
  RECEIVE_CHANNEL,
  RECEIVE_ERRORS,
  RECEIVE_CHANNELS,
  DELETE_CHANNEL
} from '../actions/channel_actions';

const defaultState = {};

const ChannelReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_CHANNEL:
      const channel = action.channel;
      newState[channel.id] = channel;
      return newState;
    case RECEIVE_ERRORS:
      newState['errors'] = action.errors;
      return newState;
    case RECEIVE_CHANNELS:
      return action.channels;
    case DELETE_CHANNEL:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default ChannelReducer;
