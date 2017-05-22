import React from 'react';
import { logout } from '../../../actions/session_actions';
import LeftNavHeader from './left_nav_header';
import { connect } from 'react-redux';
import { selectAllPublicChannels } from '../../../reducers/selectors/channel_selectors';

const mapStateToProps = (state) => (
  return {
    user: state.session.currentUser,
    firstChannel: selectAllPublicChannels(state)[0]
  };
);

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavHeader);
