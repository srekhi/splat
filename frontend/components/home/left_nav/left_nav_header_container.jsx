import React from 'react';
import { logout } from '../../../actions/session_actions';
import LeftNavHeader from './left_nav_header';
import { connect } from 'react-redux';
import { selectAllPublicChannels } from '../../../reducers/selectors/channel_selectors';
import { fetchChannels, fetchUserCount } from '../../../actions/channel_actions';

const mapStateToProps = (state) => ({
  user: state.session.currentUser,
  firstChannel: selectAllPublicChannels(state)[0]
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  fetchChannels: (userId) => dispatch(fetchChannels(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavHeader);
