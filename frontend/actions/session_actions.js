import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const REMOVE_SESSION_ERRORS = 'REMOVE_ERRORS';
export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS';


export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const removeErrors = () => ({
  type: REMOVE_SESSION_ERRORS,
});

export const clearErrors = () => dispatch => (
  dispatch(removeErrors())
);

export const signup = user => dispatch => (
  APIUtil.signup(user).then(signedUpUser => (
    dispatch(receiveCurrentUser(signedUpUser))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(signedInUser => (
    dispatch(receiveCurrentUser(signedInUser))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(user => (
    dispatch(receiveCurrentUser(null))
  ))
);

//--------------------------------
export const receiveNotifications = (notifications) => ({
  type: RECEIVE_NOTIFICATIONS,
  notifications
});


export const fetchNotifications = (userId) => dispatch => (
  APIUtil.fetchNotifications(userId).then(notifications => (
    dispatch(receiveNotifications(notifications))
  ))
);
