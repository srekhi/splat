import merge from 'lodash/merge';

import {
  RECEIVE_CHANNEL,
  RECEIVE_CHANNEL_ERRORS,
  RECEIVE_CHANNELS,
  DELETE_CHANNEL
} from '../actions/channel_actions';

const defaultState = {channels: {}, errors: []};

const ChannelReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_CHANNEL:
      const channel = action.channel;
      newState[channel.id] = channel;
      return newState;
    case RECEIVE_CHANNEL_ERRORS:
      newState['errors'] = action.errors;
      return newState;
    case RECEIVE_CHANNELS:
      newState['channels'] = action.channels; //TODO: now my state
      return newState;
    case DELETE_CHANNEL:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default ChannelReducer;
