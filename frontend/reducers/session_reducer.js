import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS,
  REMOVE_SESSION_ERRORS,
  RECEIVE_NOTIFICATIONS,
  RECEIVE_NOTIFICATION,
  REMOVE_NOTIFICATIONS
} from '../actions/session_actions';

const defaultState = Object.freeze({
  currentUser: null,
  errors: [],
  notifications: []
});

const SessionReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, state, {
        currentUser,
        notifications: []
      });
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, state, {
        errors,
        notifications: []
      });
    case REMOVE_SESSION_ERRORS:
      newState = merge({}, state, {
        notifications: []
      });
      newState['errors'] = [];
      return newState;
    case RECEIVE_NOTIFICATIONS:
      newState = merge({}, state, {
      notifications: []
    });
      newState['notifications'].push(action.notifications);
      debugger;
      return newState;
    case RECEIVE_NOTIFICATION:
      newState = merge({}, state);
      newState['notifications'].push(action.notification);
      return newState;
    case REMOVE_NOTIFICATIONS:
      newState = merge({}, state);
      // debugger;
      newState.notifications = state.notifications.filter(notification =>(
        notification.channel_id = action.channel_id
      ));
      return newState;
    default:
      return state;
  }
};

export default SessionReducer;
