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
  console.log(action);
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
      newState = merge({}, state);
      newState['errors'] = [];
      return newState;
    case RECEIVE_NOTIFICATIONS:
      newState = merge({}, state);
      newState['notifications'] = action.notifications;
      return newState;
    case RECEIVE_NOTIFICATION:
      newState = merge({}, state);
      console.log('notif received');
      newState['notifications'].push(action.notification);
      return newState;
    case REMOVE_NOTIFICATIONS:
      newState = merge({}, state);
      // debugger;
      newState.notifications = state.notifications.filter(notification =>(
        notification.channel_id !== parseInt(action.channel_id)
      ));
      return newState;
    default:
      return state;
  }
};

export default SessionReducer;
