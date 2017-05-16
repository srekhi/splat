import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS'; //add channel to state;

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const fetchUsers = () => dispatch => (
  APIUtil.fetchAllUsers().then(users => (
    dispatch(receiveUsers(users))
  ))
);
