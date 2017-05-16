import merge from 'lodash/merge';

import {
  RECEIVE_USERS,
} from '../actions/user_actions';

const defaultState = {};

const UserReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_USERS:
      return action.users;
    default:
      return state;
  }
};

export default UserReducer;
