import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Modal from 'react-modal';
import Root from './components/root';
import * as ChannelActions from './actions/channel_actions';
import * as ChannelApiUtil from './util/channel_api_util';
import * as SessionApiUtil from './util/session_api_util';

import { selectAllPublicChannels } from './reducers/selectors/channel_selectors';
import { selectAllUsers } from './reducers/selectors/user_selectors';

document.addEventListener('DOMContentLoaded', () => {
    Modal.setAppElement(document.body);
    let store;
    if (window.currentUser) {
      const preloadedState = { session: { currentUser: window.currentUser, errors: [], notifications: []} };
      store = configureStore(preloadedState);
      window.store = store;
      delete window.currentUser;
    } else {
      store = configureStore();
      window.store = store;
      window.state = store.getState();
      const root = document.getElementById('root');
  }
  ReactDOM.render(<Root store={store} />, root);
});

window.SessionApiUtil = SessionApiUtil;
window.ChannelActions = ChannelActions;
window.ChannelApiUtil = ChannelApiUtil;
window.selectAllPublicChannels = selectAllPublicChannels;
window.selectAllUsers = selectAllUsers;
