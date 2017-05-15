import React from 'react';
import { logout } from '../../../actions/session_actions';
import Header from './header';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  username: state.session.currentUser.username
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
