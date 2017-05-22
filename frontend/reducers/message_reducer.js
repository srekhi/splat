import merge from 'lodash/merge';

import {
  RECEIVE_MESSAGES,
  DELETE_MESSAGE,
  UPDATE_MESSAGE,
  RECEIVE_MESSAGE,
} from '../actions/message_actions';

const defaultState = {};

const MessageReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_MESSAGE:
      const message = action.message;
      newState[message.id] = message;
      return newState;
    case RECEIVE_MESSAGES:
      return action.messages;
    case DELETE_MESSAGE:
      delete newState[action.messageId];
      return newState;
    case UPDATE_MESSAGE:
      newState[action.message.id] = action.message;
      return newState;
    default:
      return state;
  }
};

export default MessageReducer;
