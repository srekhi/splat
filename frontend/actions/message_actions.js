import * as APIUtil from '../util/message_api_util';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'; //add messages to state;
export const DELETE_MESSAGE = 'DELETE_MESSAGE'; //fetching all messages for user
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'; //fetching all messages for user
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGES'; //add a message to state;


export const createMessage = message => dispatch => (
  APIUtil.createMessage(message).then(createdMessage => (
    dispatch(receiveMessage(createdMessage))
  )
));

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});
// --------------------------------------------------------
export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const fetchMessages = channelId => dispatch => (
  APIUtil.fetchMessagesForUser(channelId).then(messages => (
    dispatch(receiveMessages(messages))
  ))
);

export const deleteMessage = messageId => dispatch => ({
    type: DELETE_MESSAGE,
    messageId
});

export const removeMessage = messageId => dispatch => (
  APIUtil.deleteMessage(messageId).then(deletedMessageId => (
    dispatch(deleteMessage(deletedMessageId))
  ))
);
