import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, REMOVE_SESSION_ERRORS} from '../actions/session_actions';

const defaultState = Object.freeze({
  currentUser: null,
  errors: []
});

const SessionReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, state, {
        currentUser
      });
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, state, {
        errors
      });
    case REMOVE_SESSION_ERRORS:
      let newState = merge({}, state);
      newState['errors'] = [];
      return newState;
    default:
      return state;
  }
};

export default SessionReducer;
