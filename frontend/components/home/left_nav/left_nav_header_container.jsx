import React from 'react';
import { logout } from '../../../actions/session_actions';
import LeftNavHeader from './left_nav_header';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavHeader);
