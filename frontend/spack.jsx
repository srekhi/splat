import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as ChannelApiUtil from './util/channel_api_util';
document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
      const preloadedState = { session: { currentUser: window.currentUser, errors: []} };
      store = configureStore(preloadedState);
      window.store = store;
      delete window.currentUser;
    } else {
      store = configureStore();
      window.store = store;
      const root = document.getElementById('root');
  }
  ReactDOM.render(<Root store={store} />, root);
});
window.ChannelApiUtil = ChannelApiUtil;
